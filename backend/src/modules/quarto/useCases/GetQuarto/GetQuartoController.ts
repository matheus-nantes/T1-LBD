
import { Request, Response } from "express";
import { GetQuartoUseCase } from "./GetQuartoUseCase";



export class GetQuartoController {
    async handle(req: Request, res: Response){
        const getQuartoUseCase = new GetQuartoUseCase();

        const result = await getQuartoUseCase.execute();

        return res.status(201).json(result);
    }
}