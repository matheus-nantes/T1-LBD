
import { Request, Response } from "express";
import { GetClienteUseCase } from "./GetClienteUseCase";



export class GetClienteController {
    async handle(req: Request, res: Response){
        const getClienteUseCase = new GetClienteUseCase();

        const result = await getClienteUseCase.execute();

        return res.status(201).json(result);
    }
}