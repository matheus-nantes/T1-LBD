import { Request, Response } from "express";
import { DeleteClienteByIdCaseUse } from "./DeleteClienteByIdCaseUse";

export class DeleteClienteByIdController {
  async handle(req: Request, res: Response) {
    const deleteClienteByIdCaseUse = new DeleteClienteByIdCaseUse();

    const id = req.params.id;

    const result = await deleteClienteByIdCaseUse.execute({
      id,
    });

    return res.status(201).json(result);
  }
}
