import serv from "../../controllers/homePageServ/index.js";

const getHome = async (req, res) => {
  const info = await serv.getHome();
  res.render("index", { info });
};

const getDetailById = async (req, res) => {
  const { id } = req.params;
  const response = await serv.getById(id);
  res.render(`album`, response);
};
//{info, items}
const getDetailImage = async (req, res) => {
  const { img, id } = req.query;
  //console.log('query ', img, id)
  res.render(`card`, { img, id });
};

export { getHome, getDetailById, getDetailImage };
