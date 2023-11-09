import { Funcionario } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { CreateValidacaoDTO } from "../../dtos/CreateValidacaoDTO";
import { AppError } from "../../../../errors/AppError";
import { ReturnUsuarioDTO } from "../../dtos/ReturnUsuarioDTO";

export class ValidaFuncionarioUseCase {
  async execute({ cpf, senha }: CreateValidacaoDTO): Promise<ReturnUsuarioDTO> {


    const funcionarioByCpf = await prisma.funcionario.findUnique({
      where: {
        cpf,
      },
    });

    if (!funcionarioByCpf) {
      throw new AppError("CPF não cadastrado");
    }

    if (funcionarioByCpf.senha != senha) {
      throw new AppError("Senha inválida");
    }

    return funcionarioByCpf;
  }
}

