
import { Request, Response } from "express";
import { GetPagamentoUseCase } from "./GetPagamentoUseCase";



export class GetPagamentoController {
    async handle(req: Request, res: Response){
        const getPagamentoUseCase = new GetPagamentoUseCase();

        const result = await getPagamentoUseCase.execute();

        return res.status(201).json(result);
    }
}