import { Request, Response } from "express";
import { CreateClienteUseCase } from "./CreateClienteUseCase";

export class CreateClienteController {
  async handle(req: Request, res: Response) {
    const createClienteUseCase = new CreateClienteUseCase();

    const { nome, cpf, email, telefone, nivel } = req.body;

    const result = await createClienteUseCase.execute({
      nome,
      cpf,
      email,
      telefone,
      nivel,
    });

    return res.status(201).json(result);
  }
}
