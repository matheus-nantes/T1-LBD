import { Funcionario } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { CreateFuncionarioDTO } from "../../dtos/CreateFuncionarioDTO";
import { AppError } from "../../../../errors/AppError";

export class CreateFuncionarioUseCase {
  async execute({
    senha,
    nome,
    cpf,
    cargo,
    dataAdmissao,
    hotelId,
  }: CreateFuncionarioDTO): Promise<Funcionario> {
    const funcionarioAlreadyExistsAtThisHotel = await prisma.funcionario.findUnique({
      where: {
        cpf,
        hotelId
      },
    });

    if (funcionarioAlreadyExistsAtThisHotel) {
      throw new AppError("Este funcionario já esta cadastrado neste hotel!");
    }

    const funcionario = await prisma.funcionario.create({
      data: {
        senha,
        nome,
        cpf,
        cargo,
        dataAdmissao,
        hotelId,
      },
    });

    return funcionario;
  }
}
