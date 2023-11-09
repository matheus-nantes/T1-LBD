
import { Request, Response } from "express";
import { GetTagUseCase } from "./GetTagUseCase";



export class GetTagController {
    async handle(req: Request, res: Response){
        const getTagUseCase = new GetTagUseCase();

        const result = await getTagUseCase.execute();

        return res.status(201).json(result);
    }
}