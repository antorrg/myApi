import express from "express";
import h from "../handlers/userHandlers/index.js";
import midd from "../middlewares/holderMiddlewares/index.js";
import ssc from "../handlers/userHandlers/userControllers.js";
import requireAuth from "../utils/validation/requireAuth.js";
const holderRouter = express.Router();

holderRouter.post("/hold/create", midd.createHolderMidd, h.createUserCtr);
holderRouter.post("/hold/login", midd.createHolderMidd, h.loginUserCtr);
holderRouter.post("/hold/sec", h.verifyPassCtr);
holderRouter.get("/hold",  h.getUserCtr);
holderRouter.get("/hold/:id", h.getDetailCtr);
holderRouter.put("/hold/:id", midd.updHolderMidd, h.updUserCtr);
holderRouter.patch("/hold/sec/:id", h.changePassCtr);
holderRouter.delete("/hold/:id", h.delUserCtr);
holderRouter.post("/hold/sesion", ssc.loginController);
holderRouter.post("/hold/fuera", ssc.logoutController);

export default holderRouter;
