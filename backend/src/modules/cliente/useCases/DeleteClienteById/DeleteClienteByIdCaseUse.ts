import { Cliente } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { AppError } from "../../../../errors/AppError";
import {DeleteClienteDTO} from "../../dtos/DeleteClienteDTO"

export class DeleteClienteByIdCaseUse {
  async execute({ id}: DeleteClienteDTO): Promise<Cliente> {
    if (!id) {
      throw new AppError("ID não fornecido para exclusão de cliente.");
    }
  
    const clienteAlreadyExists = await prisma.cliente.findUnique({
      where: {
        id
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
