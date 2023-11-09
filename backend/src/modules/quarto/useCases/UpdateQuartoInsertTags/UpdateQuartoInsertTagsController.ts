import { Request, Response } from "express";
import { UpdateQuartoInsertTagsUseCase } from "./UpdateQuartoInsertTagsUseCase";

export class UpdateClienteController {
  async handle(req: Request, res: Response) {
    const updateQuartoInsertTagsUseCase = new UpdateQuartoInsertTagsUseCase();

    const { quartoId, tagsIds } = req.body;

    const result = await updateQuartoInsertTagsUseCase.execute({
        quartoId,
        tagsIds
    });

    return res.status(201).json(result);
  }
}
