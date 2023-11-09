import { Request, Response } from "express";
import { CreateHotelUseCase } from "./CreateHotelUseCase";

export class CreateHotelController {
  async handle(req: Request, res: Response) {
    const { cnpj, nome, endereco, numeroEstrelas } = req.body;

    const createHotelUseCase = new CreateHotelUseCase();

    const result = await createHotelUseCase.execute({
        cnpj,
        nome,
        endereco,
        numeroEstrelas
    });

    return res.status(201).json(result);
  }
}
