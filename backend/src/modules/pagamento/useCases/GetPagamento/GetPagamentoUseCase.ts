import {  Pagamento } from "@prisma/client";
import { prisma } from "../../../../prisma/client";



export class GetPagamentoUseCase {
    async execute(): Promise<Pagamento[]>{
        const pagamentos = await prisma.pagamento.findMany({});

        return pagamentos;
    }
}