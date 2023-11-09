import { Router } from "express";
import { CreateHotelController } from "../modules/hotel/useCases/CreateHotel/CreateHotelController";
import { GetHotelController } from "../modules/hotel/useCases/GetHotel/GetHOtelController";

const createHotelController = new CreateHotelController();

const getHotelController = new GetHotelController();

const hotelRoutes = Router();

hotelRoutes.post("/", createHotelController.handle);

hotelRoutes.get("/", getHotelController.handle);

export { hotelRoutes };