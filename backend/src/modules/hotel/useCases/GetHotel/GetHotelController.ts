
import { Request, Response } from "express";
import { GetHotelUseCase } from "./GetHotelUseCase"


export class GetHotelController {
    async handle(req: Request, res: Response){
        const getHotelUseCase = new GetHotelUseCase();

        const result = await getHotelUseCase.execute();
        return res.status(201).json(result);
    }
}