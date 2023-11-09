import { Router } from "express";
import { CreateReservaController } from "../modules/reserva/useCases/CreateReserva/CreateReservaController";
import { GetReservaByClienteController } from "../modules/reserva/useCases/GetReservaByCliente/GetReservaByClienteController";
import { GetReservaByQuartoController } from "../modules/reserva/useCases/GetReservaByQuarto/GetReservaByQuartoController";

const createReservaController = new CreateReservaController();

const getReservaByCliente = new GetReservaByClienteController();

const getReservaByQuartoController = new GetReservaByQuartoController();

const reservaRoutes = Router();

reservaRoutes.post("/",createReservaController.handle);

reservaRoutes.get("/bycliente/:clienteId", getReservaByCliente.handle);

reservaRoutes.get("/byquarto/:quartoId", getReservaByQuartoController.handle);

export {reservaRoutes};

