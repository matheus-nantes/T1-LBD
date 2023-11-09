import { Router } from "express";
import { GetTagController } from "../modules/tag/useCases/GetTag/GetTagController";
import { CreateTagController } from "../modules/tag/useCases/CreateTag/CreateTagController";
import { DeleteTagByIdController } from "../modules/tag/useCases/DeleteTagById/DeleteTagByIdController";
import { GetTagByIdController } from "../modules/tag/useCases/GetTagById/GetTagByIdController";
import { UpdateTagController } from "../modules/tag/useCases/UpdateTag/UpdateTagController";

const createTagController = new CreateTagController();

const deleteTagBydController = new DeleteTagByIdController();

const getTagController = new GetTagController();

const getTagByIdController = new GetTagByIdController();

const updateTagController = new UpdateTagController();

const tagRoutes = Router();

tagRoutes.post("/", createTagController.handle);

tagRoutes.delete("/", deleteTagBydController.handle);

tagRoutes.get("/", getTagController.handle);

tagRoutes.get("/byid/:id", getTagByIdController.handle);

tagRoutes.put("/",updateTagController.handle);

export {tagRoutes};