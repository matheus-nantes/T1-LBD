
import { Request, Response } from "express";
import { GetPagamentoByReservaUseCase } from "./GetPagamentoByReservaUseCase";



export class GetPagamentoByReservaController {
    async handle(req: Request, res: Response){

        const reservaId = req.params.reservaId;
        const getPagamentoUseCase = new GetPagamentoByReservaUseCase();

        const result = await getPagamentoUseCase.execute(reservaId);

        return res.status(201).json(result);
    }
}