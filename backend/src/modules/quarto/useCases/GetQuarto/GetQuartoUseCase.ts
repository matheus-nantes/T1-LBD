import {  Quarto } from "@prisma/client";
import { prisma } from "../../../../prisma/client";



export class GetQuartoUseCase {
    async execute(): Promise<Quarto[]>{
        const quartos = await prisma.quarto.findMany({
            orderBy:{
                numero: "asc"
            }
        });

        return quartos;
    }
}