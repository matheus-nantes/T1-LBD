import { Request, Response } from "express";
import { CreateMovieRentUseCase } from "./CreateMovieRentUseCase";

export class CreateMovieRentController {
    async handle(req: Request, res: Response){
        const { movieId, userId } = req.body;

        const createMovieRent = new CreateMovieRentUseCase();

        await createMovieRent.execute({ movieId, userId });
     
        return res.status(201).send();
    }
}