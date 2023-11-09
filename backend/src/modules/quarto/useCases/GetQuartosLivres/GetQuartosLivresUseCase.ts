import { Quarto } from "@prisma/client";
import { prisma } from "../../../../prisma/client";

export class GetQuartosLivresUseCase {
  async execute(checkin: Date, checkout: Date): Promise<Quarto[]> {
    const ocupados = await prisma.reserva.findMany({
      where: {
        OR: [
          {
            AND: [
              //se o checkin estiver no intervalo selecionado
              {
                checkin: {
                  gte: checkin,
                },
              },
              {
                checkin: {
                  lte: checkout,
                },
              },
            ],
          },
          {
            AND: [
              //se o checkout estiver o intervalo selecionado
              {
                checkout: {
                  gte: checkin,
                },
              },
              {
                checkout: {
                  lte: checkout,
                },
              },
            ],
          },
        ],
      },
    });

    var quartosOcupados;

    for (const reservaOcupada of ocupados) {//para cada reserva naquele período
      const reservaQuartosOcupados = await prisma.reservaQuartos.findMany({//obtenho os quartos de cada reserva
        where: {
          reservaId: reservaOcupada.id,
        },
      });

        for (const quarto of reservaQuartosOcupados) {//pego cada quarto unitariamente e insiro ele numa lista
            const temp = await prisma.quarto.findUnique({
                where:{
                    id: quarto.quartoId
                }
            })

            quartosOcupados.push(temp?.id);
        }
    }

    const quartosLivres = await prisma.quarto.findMany({
        where:{
            id:{
                notIn: quartosOcupados,
            }
        }
    })

    return quartosLivres;
  }
}
