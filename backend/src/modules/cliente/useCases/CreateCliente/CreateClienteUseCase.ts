import { Cliente } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { CreateClienteDTO } from "../../dtos/CreateClienteDTO";
import { AppError } from "../../../../errors/AppError";

export class CreateClienteUseCase {
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

    if (clienteAlreadyExists) {
      throw new AppError("Cliente já existe!");
    }

    const cliente = await prisma.cliente.create({
      data: {
        nome,
        cpf,
        email,
        telefone,
        nivel,
      },
    });

    return cliente;
  }
}
