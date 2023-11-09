
import { Request, Response } from "express";
import { GetClienteByIdUseCase } from "./GetClienteByIdUseCase";



export class GetClienteByIdController {
    async handle(req: Request, res: Response){
        const id = req.body.params;

        const getClienteByIdUseCase = new GetClienteByIdUseCase();

        const result = await getClienteByIdUseCase.execute(id);

        return res.status(201).json(result);
    }
}