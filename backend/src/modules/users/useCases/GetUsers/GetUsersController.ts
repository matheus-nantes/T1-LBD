
import { Request, Response } from "express";
import { GetUserUseCase } from "./GetUsersUseCase";



export class GetUsersController {
    async handle(req: Request, res: Response){
        const getUserUseCase = new GetUserUseCase();

        const result = await getUserUseCase.execute();

        return res.status(201).json(result);
    }
}