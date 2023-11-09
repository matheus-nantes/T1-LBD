
import { Request, Response } from "express";
import { GetTagByIdUseCase } from "./GetTagByIdUseCase";



export class GetTagByIdController {
    async handle(req: Request, res: Response){
        const id = req.body.params;

        const getTagByIdUseCase = new GetTagByIdUseCase();

        const result = await getTagByIdUseCase.execute(id);

        return res.status(201).json(result);
    }
}