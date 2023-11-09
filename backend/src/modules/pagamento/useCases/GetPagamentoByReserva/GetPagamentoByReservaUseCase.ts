import {  Pagamento } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { AppError } from "../../../../errors/AppError";



export class GetPagamentoByReservaUseCase {
    async execute(reservaId): Promise<Pagamento>{
        const pagamento = await prisma.pagamento.findUnique({
            where:{
                reservaId
            }
        });

        if(pagamento === null){
            throw new AppError("Pagamento não encontrado");
        }

        return pagamento;
    }
}