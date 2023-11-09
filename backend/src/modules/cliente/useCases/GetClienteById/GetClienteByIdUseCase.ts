import {  Cliente } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { AppError } from "../../../../errors/AppError";



export class GetClienteByIdUseCase {
    async execute(id:string): Promise<Cliente>{
        const cliente = await prisma.cliente.findUnique({
            where:{
                id
            }
        });
        if(cliente === null){
            throw new AppError("Cliente não encontrado");
        }

        return cliente;
    }
}