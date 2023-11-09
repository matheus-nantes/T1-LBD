import { Tag } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { CreateTagDTO } from "../../dtos/CreateTagDTO";
import { AppError } from "../../../../errors/AppError";

export class DeleteTagByIdUseCase {
  async execute({ id }): Promise<Tag> {
    const tagAlreadyExists = await prisma.tag.findUnique({
      where: {
        id,
      },
    });

    if (!tagAlreadyExists) {
      throw new AppError("Remoção negada - Tag inexistente!");
    }

    const tag = await prisma.tag.delete({
      where: {
        id,
      },
    });

    return tag;
  }
}
