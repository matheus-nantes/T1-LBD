import { Router } from "express";
import { CreateClienteController } from "../modules/cliente/useCases/CreateCliente/CreateClienteController";
import { GetClienteController } from "../modules/cliente/useCases/GetCliente/GetClienteController";
import {DeleteClienteByIdController} from "../modules/cliente/useCases/DeleteClienteById/DeleteClienteByIdController"
import { GetClienteByIdController } from "../modules/cliente/useCases/GetClienteById/GetClienteByIdController"
import { UpdateClienteController } from "../modules/cliente/useCases/UpdateCliente/UpdateClienteController"

const createClienteController = new CreateClienteController();

const deleteClienteController = new DeleteClienteByIdController();

const getClienteController = new GetClienteController();

const getClienteByIdController = new GetClienteByIdController();

const updateClienteController = new UpdateClienteController();

const clienteRoutes = Router();

clienteRoutes.post("/", createClienteController.handle);

clienteRoutes.get("/", getClienteController.handle);

clienteRoutes.delete("/:id", deleteClienteController.handle);

clienteRoutes.get("/:id", getClienteByIdController.handle);

clienteRoutes.put("/",updateClienteController.handle);

export { clienteRoutes };