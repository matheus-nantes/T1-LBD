import { Router } from "express";

import { CreateFuncionarioController } from "../modules/funcionario/useCases/CreateFuncionario/CreateFuncionarioController";
import { GetFuncionarioController } from "../modules/funcionario/useCases/GetFuncionario/GetFuncionarioController";
import { ValidaFuncionarioController } from "../modules/funcionario/useCases/ValidaFuncionario/ValidaFuncionarioController";

const createFuncionarioController = new CreateFuncionarioController();

const getFuncionarioController = new GetFuncionarioController();

const validaFuncionarioController = new ValidaFuncionarioController();

const funcionarioRoutes = Router();

funcionarioRoutes.post("/",createFuncionarioController.handle);

funcionarioRoutes.get("/", getFuncionarioController.handle);

funcionarioRoutes.post("/valida",validaFuncionarioController.handle )

export {funcionarioRoutes};

