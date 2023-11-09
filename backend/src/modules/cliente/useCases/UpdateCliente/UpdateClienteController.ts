import { Request, Response } from "express";
import { UpdateClienteCaseUse } from "./UpdateClienteCaseUse";

export class UpdateClienteController {
  async handle(req: Request, res: Response) {
    const updateClienteCaseUse = new UpdateClienteCaseUse();

    const { nome, cpf, email, telefone, nivel } = req.body;

    const result = await updateClienteCaseUse.execute({
      nome,
      cpf,
      email,
      telefone,
      nivel,
    });

    return res.status(201).json(result);
  }
}
