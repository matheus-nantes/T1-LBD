import { Request, Response } from "express";
import { ValidaFuncionarioUseCase } from "../ValidaFuncionario/ValidaFuncionarioUseCase";



export class ValidaFuncionarioController {
    async handle(req: Request, res: Response){

        const {cpf, senha} = req.body;

        const validaFuncionarioUseCase = new ValidaFuncionarioUseCase();

        const result = await validaFuncionarioUseCase.execute({cpf, senha});

        return res.status(201).json(result);
    }
}