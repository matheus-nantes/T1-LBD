import { Cliente } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { CreateClienteDTO } from "../../dtos/CreateClienteDTO";
import { AppError } from "../../../../errors/AppError";

export class DeleteClienteByIdCaseUse {
  async execute({ id }): Promise<Cliente> {
    const clienteAlreadyExists = await prisma.cliente.findUnique({
      where: {
        id,
      },
    });

    if (!clienteAlreadyExists) {
      throw new AppError("Remoção negada - Cliente inexistente!");
    }

    const cliente = await prisma.cliente.delete({
      where: {
        id,
      },
    });

    return cliente;
  }
}
