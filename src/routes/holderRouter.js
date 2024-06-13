import express from "express";
import h from "../handlers/userHandlers/index.js";
import createHolderMidd from "../middlewares/holderMiddlewares/createHolderMidd.js";
const holderRouter = express.Router();

holderRouter.post("/hold/create", createHolderMidd, h.createUserCtr)
holderRouter.post("/hold/login", createHolderMidd, h.loginUserCtr)
holderRouter.get("/hold", h.getUserCtr);
holderRouter.get("/hold/:id", h.getDetailCtr);
holderRouter.put("/hold/:id",)
holderRouter.delete("/hold/:id",)

export default holderRouter;
