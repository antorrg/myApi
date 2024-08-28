import express from "express";
import multer from 'multer';
//import { uploadImage } from './firebase.js';
import ctr from "../handlers/userHandlers/mvcUserControllers.js";
import actr from '../handlers/userHandlers/mvcAdminControllers.js'
import mid from "../middlewares/homeMiddlewares/index.js";
import midd from "../middlewares/holderMiddlewares/index.js"
import requireAuth from "../utils/validation/requireAuth.js";

const userRouter = express.Router();

const upload = multer({ storage: multer.memoryStorage() });
//Los controladores de este router se encuentran en handlers/getControllers.js
userRouter.get("/login", ctr.signIn);
userRouter.post("/login", midd.createHolderMidd, ctr.loginController);
userRouter.get("/logout", ctr.logoutController)
userRouter.get("/admin", requireAuth, ctr.dashBoard);
userRouter.get('/admin/page/:id', requireAuth, actr.detailPages )
userRouter.get('/admin/item/:id', requireAuth, actr.detailItem)
userRouter.get('/admin/page/update/:id', requireAuth, actr.updFormPage)
userRouter.get('/admin/item/update/:id', requireAuth,actr.updFormItem )
userRouter.get('/admin/page/itemCreate/:id', requireAuth, actr.createFormItem)
userRouter.get('/admin/users', requireAuth, actr.allUsers)


export default userRouter;
