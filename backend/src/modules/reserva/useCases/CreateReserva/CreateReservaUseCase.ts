import { Reserva } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { CreateReservaDTO, QuartoReservadoDTO } from "../../dtos/CreateReservaDTO";
import { AppError } from "../../../../errors/AppError";

export class CreateReservaUseCase {
  async execute({
    checkin,
    checkout,
    nAdultos,
    nCriancas,
    status,
    clienteId,
    funcionarioId,
    quartosReservados, 
    metodoPagamento
  }: CreateReservaDTO): Promise<Reserva> {
    const clienteExists = await prisma.cliente.findFirst({
      where: {
        id: clienteId,
      },
    });

    if (!clienteExists) {
      throw new AppError("Cliente inexistente!");
    }

    const funcionarioExists = await prisma.funcionario.findFirst({
      where: {
        id: funcionarioId,
      },
    });


    if (!funcionarioExists) {
      throw new AppError("Funcionario inexistente!");
    }

    if(nAdultos == 0){
        if(nCriancas == 0)
            throw new AppError("Impossível reservar quartos para ninguém");
        throw new AppError("Não é possível realizar reservas para crianças desacompanhadas");
    }


    var preco = 0.0;
    var qtdAdultos = 0;
    var qtdCriancas = 0;
    var diffEmDias = 0;


    if(quartosReservados.length === 0){
      throw new AppError("Não é possível realizar reservas sem quartos");
    }
    for (const quartoReservadoData of quartosReservados) {//para cada quarto da reserva, valida
        const quartoExists = await prisma.quarto.findFirst({//se o quarto existe
            where:{
                id: quartoReservadoData.quartoId
            }
        });
        if(!quartoExists){
            throw new AppError(`Quarto ${quartoReservadoData} não existe!`);
        }

        //encontrar todas as reservas daquele quarto
        const reservasDesteQuarto = await prisma.reservaQuartos.findMany({
            where:{
                quartoId: quartoReservadoData.quartoId
            }
        })

        if (reservasDesteQuarto) {//se há reservas
            for (const reservaDesseQuarto of reservasDesteQuarto) {//para cada reserva deste quarto
                const reservaCompara = await prisma.reserva.findFirst({//busca a reserva corretamente
                    where: {
                        id: reservaDesseQuarto.reservaId
                    }
                });
    
                if (reservaCompara) {//se a reserva existir
                    // Se o checkin ou checkout estiver dentro de um intervalo já reservado
                    if (
                        (checkin > reservaCompara.checkin && checkin < reservaCompara.checkout) ||
                        (checkout > reservaCompara.checkin && checkout < reservaCompara.checkout)
                    ) {
                        throw new AppError(`Impossível efetuar reserva pois o quarto ${reservaDesseQuarto.quartoId} já está reservado neste período`);
                    }
                }
                
            }
        }

        if (checkout instanceof Date) {
          const checkoutTime: number = checkout.getTime();
          if (checkin instanceof Date) {
            const checkinTime: number = checkin.getTime();
            diffEmDias = Math.floor(Math.abs(checkout.getTime() - checkin.getTime()))/ (1000 * 60 * 60 * 24);//calcula quantos dias de duração a reserva tem
        
          } else {
            console.error('checkout não é uma instância válida de Date');
          }
        } else {
          console.error('checkout não é uma instância válida de Date');
        }

        preco += (quartoExists.precoDiaria.toNumber() * (diffEmDias < 1? 1 : diffEmDias));//adiciona ao preco o valor deste quarto alugado por x dias

        qtdAdultos += quartoExists.capacidadeAdultos;
        qtdCriancas += quartoExists.capacidadeCriancas;
    }



    if(qtdAdultos < nAdultos){//adultos não podem ocupar lugar de criança
        throw new AppError("Quantidade de Adultos excedente");
    }

    if(nCriancas > qtdCriancas+(qtdAdultos-nAdultos)){//criança pode ocupar lugar de adulto
        throw new AppError("Quantidade de Crianças excedente");
    }

    //se tudo for válido, cria a reserva
    const reserva = await prisma.reserva.create({
      data: {
        checkin,
        checkout,
        nAdultos,
        nCriancas,
        preco,
        status,
        clienteId,
        funcionarioId,
      },
    });

    if(reserva){
    for (const quartoReservadoData of quartosReservados) {
        const temp = await prisma.reservaQuartos.create({
          data: {
            reserva: {
              connect: { id: reserva.id }, // Associe o quarto à reserva criada
            },
            quarto: {
              connect: { id: quartoReservadoData.quartoId }, // Associe o quarto pelo ID fornecido
            },
          },
        });
      }

    //criar pagamento desta reserva
    const pag = await prisma.pagamento.create({
      data: {
        metodo: metodoPagamento,
        valor: preco,
        reserva: {
          connect: { id: reserva.id },
        },
      },
    });
  }
  else{
    throw new AppError("Não foi possíve criar a reserva");
  }

    return reserva;
  }
}
