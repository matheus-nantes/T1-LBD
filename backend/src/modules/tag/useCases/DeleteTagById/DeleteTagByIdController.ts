import { Request, Response } from "express";
import { DeleteTagByIdUseCase } from "./DeleteTagByIdUseCase";

export class DeleteTagByIdController {
  async handle(req: Request, res: Response) {
    const deleteTagByIdUseCase = new DeleteTagByIdUseCase();

    const id = req.params.id;

    const result = await deleteTagByIdUseCase.execute({
      id,
    });

    return res.status(201).json(result);
  }
}
