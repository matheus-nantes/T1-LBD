import { Quarto } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { AppError } from "../../../../errors/AppError";
import { InsertTagsDTO } from "../../dtos/InsertTagsDTO";

export class UpdateQuartoInsertTagsUseCase {
  async execute({
    quartoId,
    tagsIds
  }: InsertTagsDTO): Promise<Quarto> {
    
    const quartoExists = await prisma.quarto.findUnique({
        where:{
            id: quartoId
        }
    })

    if(!quartoExists){
        throw new AppError("Quarto inexistente");
    }

    for(const idtag of tagsIds){
        const valid = await prisma.tag.findUnique({
            where: {
                id: idtag
            }
        })
        
        if(valid === null){
            throw new AppError("Tag inexistente");
        }

        const jaTem = await prisma.tagQuartos.findFirst({
            where:{
                idTag:idtag,
                idQuarto: quartoId
            }
        })

        if(jaTem){
            throw new AppError("Este quarto já possui esta Tag");
        }
    }

    var tagsInseridas;
    for(const idtag of tagsIds){
        const inseriu = await prisma.tagQuartos.create({
            data: {
                quarto: {
                  connect: { id: quartoId }, // Associe o quarto pelo id recebido ppor parametro
                },
                tag: {
                  connect: { id: idtag }, // Associe a tag pelo ID da vez
                },
              },
        });
        tagsInseridas.push(inseriu);
    }

    const quarto = await prisma.quarto.update({
        where:{
            id: quartoId
        },
        data:{
            tags: tagsInseridas
        }
    })

    return quarto;
  }
}
