import serv from "../../controllers/homePageServ/index.js";

const getHome = async (req, res) => {
  const info = await serv.getHome();
  res.render("index", { info });
};

const getDetailById = async (req, res) => {
  const { id } = req.params;
  const response = await serv.getById(id);
  res.render(`detalles`, response);
};
//{info, items}
const getDetailImage = async (req, res) => {
  const { img, id } = req.query;
  const item = await serv.getDetail(id)
  res.render(`card`, { img, item });
};

export { getHome, getDetailById, getDetailImage };
