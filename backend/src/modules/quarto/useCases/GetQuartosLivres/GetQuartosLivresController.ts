
import { Request, Response } from "express";
import { GetQuartosLivresUseCase } from "./GetQuartosLivresUseCase";



export class GetQuartosLivresController {
    async handle(req: Request, res: Response){
        const getReservaByQuartoUseCase = new GetQuartosLivresUseCase();

        const checkin = req.params.checkin;

        const checkout = req.params.checkout;

        const result = await getReservaByQuartoUseCase.execute(new Date(checkin), new Date(checkout));

        return res.status(201).json(result);
    }
}