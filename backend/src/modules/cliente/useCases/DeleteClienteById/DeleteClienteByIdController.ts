import { Request, Response } from "express";
import { DeleteClienteByIdCaseUse } from "./DeleteClienteByIdCaseUse";

export class DeleteClienteByIdController {
  async handle(req: Request, res: Response) {
  
    const { id } = req.params;

    console.log(id);  

    const deleteClienteByIdCaseUse = new DeleteClienteByIdCaseUse();

    const result = await deleteClienteByIdCaseUse.execute({ id });

    return res.status(201).json(result);

  }
}
