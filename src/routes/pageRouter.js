import express from 'express'
import ctr from "../handlers/homePageHandlers/index.js";
import mid from "../middlewares/homeMiddlewares/index.js";
import { uploadMiddleware, uploadUpdPage} from '../middlewares/homeMiddlewares/multer.js'
import jwt from '../utils/validation/jwt.js'
const pageRouter = express.Router()

pageRouter.post("/page/create",  mid.createMidd,ctr.createController);
pageRouter.post("/page/item/create",  mid.createItem, ctr.createItemController)
pageRouter.get("/page",  ctr.getPageHand);
pageRouter.get("/page/:id",  ctr.getPageById);
pageRouter.get("/page/item/:id",  ctr.getItemById)
pageRouter.put("/page/:id", jwt.verifyToken, uploadUpdPage,ctr.updController);
pageRouter.patch("/page/:id", jwt.verifyToken,uploadMiddleware, ctr.detailUpdController);
pageRouter.delete("/page/:id", ctr.delController);


//mid.createItem,
export default pageRouter;
