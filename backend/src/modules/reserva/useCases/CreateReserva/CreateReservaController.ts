import { Request, Response } from "express";
import { CreateReservaUseCase } from "./CreateReservaUseCase";

export class CreateReservaController {
  async handle(req: Request, res: Response) {
    const {
      checkin,
      checkout,
      nAdultos,
      nCriancas,
      status,
      clienteId,
      funcionarioId,
      quartosReservados,
      metodoPagamento
    } = req.body;

    const createReservaUseCase = new CreateReservaUseCase();

    const result = await createReservaUseCase.execute({
      checkin,
      checkout,
      nAdultos,
      nCriancas,
      status,
      clienteId,
      funcionarioId,
      quartosReservados,
      metodoPagamento
    });

    return res.status(201).json(result);
  }
}
