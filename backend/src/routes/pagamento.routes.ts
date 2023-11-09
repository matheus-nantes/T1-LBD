import { Router } from "express";
import { CreatePagamentoController } from "../modules/pagamento/useCases/CreatePagamento/CreatePagamentoController";
import { GetPagamentoController } from "../modules/pagamento/useCases/GetPagamento/GetPagamentoController";
import { GetPagamentoByReservaController } from "../modules/pagamento/useCases/GetPagamentoByReserva/GetPagamentoByReservaController";

const createPagamentoController = new CreatePagamentoController();

const getPagamentoController = new GetPagamentoController();

const getPagamentoByReservaController = new GetPagamentoByReservaController();

const pagamentoRoutes = Router();

pagamentoRoutes.post("/", createPagamentoController.handle);

pagamentoRoutes.get("/", getPagamentoController.handle);

pagamentoRoutes.get("/byreserva/:reservaId", getPagamentoByReservaController.handle);

export { pagamentoRoutes };