import { Pagamento } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { CreatePagamentoDTO } from "../../dtos/CreatePagamentoDTO";
import { AppError } from "../../../../errors/AppError";

export class CreatePagamentoUseCase {
  async execute({
    metodo,
    valor,
    reservaId,
  }: CreatePagamentoDTO): Promise<Pagamento> {
    const pagamentoAlreadyExists = await prisma.pagamento.findUnique({
      where: {
        reservaId,
      },
    });

    if (pagamentoAlreadyExists) {
      throw new AppError("Esta reserva já possui um pagamento!");
    }

    if(!pagamentoAlreadyExists){
        throw new AppError("Não é possível criar pagamento sem ter feito uma reserva válida!");
    }

    const pagamento = await prisma.pagamento.create({
      data: {
        metodo,
        valor,
        reservaId,
      },
    });

    return pagamento;
  }
}
