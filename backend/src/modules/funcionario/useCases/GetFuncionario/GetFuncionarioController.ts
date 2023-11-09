import { Request, Response } from "express";
import { GetFuncionarioUseCase } from "../GetFuncionario/GetFuncionarioUseCase";



export class GetFuncionarioController {
    async handle(req: Request, res: Response){
        const getFuncionarioUseCase = new GetFuncionarioUseCase();

        const result = await getFuncionarioUseCase.execute();

        return res.status(201).json(result);
    }
}