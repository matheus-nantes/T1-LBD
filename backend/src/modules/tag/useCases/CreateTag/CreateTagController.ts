import { Request, Response } from "express";
import { CreateTagUseCase } from "./CreateTagUseCase";

export class CreateTagController {
    async handle(req: Request, res: Response){
        const { descricao, cor } = req.body;

        const  createTagUseCase = new CreateTagUseCase();

        const result = await createTagUseCase.execute({descricao, cor});

        return res.status(201).json(result);
    }
}