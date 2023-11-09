import {  Tag } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { AppError } from "../../../../errors/AppError";



export class GetTagByIdUseCase {
    async execute(id:string): Promise<Tag>{
        const tag = await prisma.tag.findUnique({
            where:{
                id
            }
        });
        if(tag === null){
            throw new AppError("tag não encontrada");
        }

        return tag;
    }
}