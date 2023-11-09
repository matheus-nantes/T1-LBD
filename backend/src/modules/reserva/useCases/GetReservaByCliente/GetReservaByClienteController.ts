
import { Request, Response } from "express";
import { GetReservaByClienteUseCase } from "./GetReservaByClienteUseCase";



export class GetReservaByClienteController {
    async handle(req: Request, res: Response){
        
        const getReservaByClienteUseCase = new GetReservaByClienteUseCase();

        const clienteId = req.params.clienteId;

        const result = await getReservaByClienteUseCase.execute(clienteId);

        return res.status(201).json(result);
    }
}