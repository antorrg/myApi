import express from "express";
import ctr from "../handlers/homePageHandlers/index.js";
import mid from "../middlewares/homeMiddlewares/index.js";

const homeRouter = express.Router();

//Los controladores de este router se encuentran en handlers/getControllers.js
homeRouter.get("/", mid.protectRoute, ctr.getHome);

homeRouter.get("/detalles/:id", mid.protectParam, mid.protectRoute, ctr.getDetailById);

homeRouter.get("/detalles", mid.protectRoute, ctr.getDetailImage);

homeRouter.get('/contacto', ctr.getContact)

homeRouter.get('/acerca', ctr.aboutMe)


export default homeRouter;
