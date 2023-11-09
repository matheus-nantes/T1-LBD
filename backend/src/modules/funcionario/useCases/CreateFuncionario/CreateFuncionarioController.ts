import { Request, Response } from "express";
import { CreateFuncionarioUseCase } from "./CreateFuncionarioUseCase";

export class CreateFuncionarioController {
  async handle(req: Request, res: Response) {
    const { senha, nome, cpf, cargo, dataAdmissao, hotelId } = req.body;

    const createFuncionarioUseCase = new CreateFuncionarioUseCase();

    const result = await createFuncionarioUseCase.execute({
      senha,
      nome,
      cpf,
      cargo,
      dataAdmissao,
      hotelId,
    });

    return res.status(201).json(result);
  }
}
