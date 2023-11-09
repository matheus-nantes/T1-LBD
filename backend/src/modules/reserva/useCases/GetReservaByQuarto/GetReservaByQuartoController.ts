
import { Request, Response } from "express";
import { GetReservaByQuartoUseCase } from "./GetReservaByQuartoUseCase";



export class GetReservaByQuartoController {
    async handle(req: Request, res: Response){
        const getReservaByQuartoUseCase = new GetReservaByQuartoUseCase();

        const quartoId = req.params.quartoId;

        const result = await getReservaByQuartoUseCase.execute(quartoId);

        return res.status(201).json(result);
    }
}