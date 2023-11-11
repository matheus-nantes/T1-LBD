import {  Cliente } from "@prisma/client";
import { prisma } from "../../../../prisma/client";



export class GetClienteUseCase {
    async execute(): Promise<Cliente[]>{
        const clientes = await prisma.cliente.findMany({
            orderBy:{
                nome:"asc"
            }
        });

        return clientes;
    }
}