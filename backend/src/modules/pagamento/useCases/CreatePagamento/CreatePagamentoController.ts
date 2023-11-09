import { Request, Response } from "express";
import { CreatePagamentoUseCase } from "./CreatePagamentoUseCase";

export class CreatePagamentoController {
  async handle(req: Request, res: Response) {
    const { metodo, valor, reservaId } = req.body;

    const createPagamentoUseCase = new CreatePagamentoUseCase();

    const result = await createPagamentoUseCase.execute({
      metodo,
      valor,
      reservaId,
    });

    return res.status(201).json(result);
  }
}
