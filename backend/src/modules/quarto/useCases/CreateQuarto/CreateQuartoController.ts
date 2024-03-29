import { Request, Response } from "express";
import { CreateQuartoUseCase } from "./CreateQuartoUseCase";

export class CreateQuartoController {
  async handle(req: Request, res: Response) {
    const {
      hotelId,
      numero,
      capacidadeAdultos,
      capacidadeCriancas,
      disponibilidade,
      precoDiaria,
      tipo,
    } = req.body;

    const createQuartoUseCase = new CreateQuartoUseCase();

    const result = await createQuartoUseCase.execute({
      hotelId,
      numero,
      capacidadeAdultos,
      capacidadeCriancas,
      disponibilidade,
      precoDiaria,
      tipo,
    });

    return res.status(201).json(result);
  }
}
