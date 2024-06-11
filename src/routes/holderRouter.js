import express from "express";
import h from "../handlers/userHandlers/index.js";
import * as ff from "../controllers/homeServ/getHome.js";
const holderRouter = express.Router();

holderRouter.get("/hold", (req, res) =>
  res.json({ name: "antonio", apellido: "rodriguez" })
);
holderRouter.get("/hold/page", async (req, res) => {
  try {
    const response = await ff.getHome();
    res.status(200).json(response);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});
holderRouter.get("/hold/page/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await ff.getById(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});
export default holderRouter;
