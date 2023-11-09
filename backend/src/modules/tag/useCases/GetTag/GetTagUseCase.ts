import {  Tag } from "@prisma/client";
import { prisma } from "../../../../prisma/client";



export class GetTagUseCase {
    async execute(): Promise<Tag[]>{
        const tags = await prisma.tag.findMany({});

        return tags;
    }
}