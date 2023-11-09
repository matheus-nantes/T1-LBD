import { Quarto } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { CreateQuartoDTO } from "../../dtos/CreateQuartoDTO";
import { AppError } from "../../../../errors/AppError";

export class CreateQuartoUseCase {
  async execute({
    numero,
    capacidadeAdultos,
    capacidadeCriancas,
    disponibilidade,
    precoDiaria,
    tipo,
  }: CreateQuartoDTO): Promise<Quarto> {
    const quartoAlreadyExists = await prisma.quarto.findUnique({
      where: {
        numero,
      },
    });

    if (quartoAlreadyExists) {
      throw new AppError("Quarto already exists!");
    }

    const quarto = await prisma.quarto.create({
      data: {
        numero,
        capacidadeAdultos,
        capacidadeCriancas,
        disponibilidade,
        precoDiaria,
        tipo,
      },
    });

    return quarto;
  }
}
