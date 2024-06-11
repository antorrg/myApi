import express from 'express'
import ctr from "../handlers/homeHandlers/index.js";
import mid from "../middlewares/homeMiddlewares/index.js";
const pageRouter = express.Router()

pageRouter.post("/create", mid.createMidd, ctr.createController);

export default pageRouter;