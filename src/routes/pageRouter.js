import express from 'express'
import ctr from "../handlers/homePageHandlers/index.js";
import { uploadImg } from '../handlers/homePageHandlers/uploadImg.js';
import mid from "../middlewares/homeMiddlewares/index.js";
import * as upl from '../middlewares/homeMiddlewares/multer.js'
import jwt from '../utils/validation/jwt.js'
const pageRouter = express.Router()

pageRouter.post('/upload',   jwt.verifyToken, upl.uploadMiddleware, uploadImg)
pageRouter.post("/page/createProject",   jwt.verifyToken, ctr.createController);
pageRouter.post("/page/item/create",  jwt.verifyToken, upl.uploadMiddleware, ctr.createItemController)
pageRouter.get("/page",  ctr.getPageHand);
pageRouter.get("/page/:id",  ctr.getPageById);
pageRouter.get("/page/item/:id",  ctr.getItemById)
pageRouter.delete("/page/item/:id", )
pageRouter.put("/page/:id", jwt.verifyToken,  ctr.updController);
pageRouter.patch("/page/:id", jwt.verifyToken, upl.uploadMiddleware, ctr.detailUpdController);
pageRouter.delete("/page/:id", ctr.delController);


//mid.createItem,
export default pageRouter;
