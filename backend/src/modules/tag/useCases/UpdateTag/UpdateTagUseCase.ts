import { Tag } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { UpdateTagDTO } from "../../dtos/UpdateTagDTO";
import { AppError } from "../../../../errors/AppError";

export class UpdateTagUseCase {
  async execute({
    id,
    descricao,
    cor
  }: UpdateTagDTO): Promise<Tag> {
    const tagAlreadyExists = await prisma.tag.findUnique({
      where: {
        id
      },
    });

    if (!tagAlreadyExists) {
      throw new AppError("Atualização negada - Tag inexistente!");
    }

    const tag = await prisma.tag.update({
        where:{
            id
        },
        data: {
            descricao,
            cor
        },
    });

    return tag;
  }
}
