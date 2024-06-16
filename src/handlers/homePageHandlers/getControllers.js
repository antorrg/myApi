import serv from "../../controllers/homePageServ/index.js";

export const getHome = async (req, res) => {
  const info = await serv.getHome();
  res.render("index", { info });
};

export const getDetailById = async (req, res) => {
  const { id } = req.params;
  const response = await serv.getById(id);
  res.render(`detalles`, response);
};
//{info, items}
export const getDetailImage = async (req, res) => {
  const { img, id } = req.query;
  const item = await serv.getDetail(id)
  res.render(`card`, { img, item });
};

export const getContact = async (req, res)=>{
  res.render('contact')
}

export const aboutMe = async(req, res)=>{
  res.render('acerca')
}



