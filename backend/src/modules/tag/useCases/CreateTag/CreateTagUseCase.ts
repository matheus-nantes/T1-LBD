import { Tag } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { CreateTagDTO } from "../../dtos/CreateTagDTO";
import { AppError } from "../../../../errors/AppError";

export class CreateTagUseCase {
  async execute({ descricao, cor }: CreateTagDTO): Promise<Tag> {
    const tagAlreadyExists = await prisma.tag.findUnique({
      where: {
        descricao,
      },
    });

    if (tagAlreadyExists) {
      throw new AppError("Tag já existente!");
    }

    const tag = await prisma.tag.create({
      data: {
        descricao,
        cor,
      },
    });

    return tag;
  }
}
