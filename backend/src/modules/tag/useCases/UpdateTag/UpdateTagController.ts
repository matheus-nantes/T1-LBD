import { Request, Response } from "express";
import { UpdateTagUseCase } from "./UpdateTagUseCase";

export class UpdateTagController {
  async handle(req: Request, res: Response) {
    const updateTagUseCase = new UpdateTagUseCase();

    const { id, descricao, cor } = req.body;

    const result = await updateTagUseCase.execute({
      id,
      descricao,
      cor,
    });

    return res.status(201).json(result);
  }
}
