import { Router } from "express";
import { CreateQuartoController } from "../modules/quarto/useCases/CreateQuarto/CreateQuartoController";
import { GetQuartoController } from "../modules/quarto/useCases/GetQuarto/GetQuartoController";
import { GetQuartosLivresController } from "../modules/quarto/useCases/GetQuartosLivres/GetQuartosLivresController";

const createQuartoController = new CreateQuartoController();

const getQuartoController = new GetQuartoController();

const getQuartosLivresController = new GetQuartosLivresController();

const quartoRoutes = Router();

quartoRoutes.post("/", createQuartoController.handle);

quartoRoutes.get("/", getQuartoController.handle);

quartoRoutes.get("/livres/:checkin/:checkout", getQuartosLivresController.handle);

export { quartoRoutes };