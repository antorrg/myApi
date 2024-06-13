import express from 'express'
import ctr from "../handlers/homePageHandlers/index.js";
import mid from "../middlewares/homeMiddlewares/index.js";
const pageRouter = express.Router()

pageRouter.post("/page/create", mid.createMidd, ctr.createController);
pageRouter.get("/page",  ctr.getPageHand);
pageRouter.get("/page/:id",  ctr.getPageById);
pageRouter.put("/page/:id", ctr.updController);
pageRouter.patch("/page/:id", ctr.detailUpdController);
pageRouter.delete("/page/:id", ctr.delController);


export default pageRouter;
