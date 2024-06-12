import express from "express";
import ctr from "../handlers/homeHandlers/index.js";
import mid from "../middlewares/homeMiddlewares/index.js";
const homeRouter = express.Router();

homeRouter.get("/", ctr.getHome);

homeRouter.get("/album/:id", ctr.getDetailById);

homeRouter.get("/album", ctr.getDetailImage);

//homeRouter.get('/about', )

export default homeRouter;
