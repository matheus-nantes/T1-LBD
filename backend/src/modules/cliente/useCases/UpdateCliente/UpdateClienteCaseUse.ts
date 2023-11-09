import { Cliente } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { CreateClienteDTO } from "../../dtos/CreateClienteDTO";
import { AppError } from "../../../../errors/AppError";

export class UpdateClienteCaseUse {
  async execute({
    nome,
    cpf,
    email,
    telefone,
    nivel,
  }: CreateClienteDTO): Promise<Cliente> {
    const clienteAlreadyExists = await prisma.cliente.findUnique({
      where: {
        cpf,
      },
    });

    if (!clienteAlreadyExists) {
      throw new AppError("Atualização negada - Cliente inexistente!");
    }

    const cliente = await prisma.cliente.update({
        where:{
            cpf
        },
        data: {
            nome,
            email,
            telefone,
            nivel,
        },
    });

    return cliente;
  }
}
