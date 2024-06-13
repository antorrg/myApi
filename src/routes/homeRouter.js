import express from "express";
import ctr from "../handlers/homePageHandlers/index.js";
import mid from "../middlewares/homeMiddlewares/index.js";
const homeRouter = express.Router();

homeRouter.get("/", ctr.getHome);

homeRouter.get("/detalles/:id", ctr.getDetailById);

homeRouter.get("/detalles", ctr.getDetailImage);

//homeRouter.get('/about', )

export default homeRouter;
