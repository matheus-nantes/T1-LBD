import {  Funcionario } from "@prisma/client";
import { prisma } from "../../../../prisma/client";



export class GetFuncionarioUseCase {
    async execute(): Promise<Funcionario[]>{
        const funcionarios = await prisma.funcionario.findMany({});

        return funcionarios;
    }
}