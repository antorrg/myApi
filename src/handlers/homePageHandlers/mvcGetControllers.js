import eh from '../../utils/errors/index.js'
import serv from "../../controllers/homePageServ/index.js";

export default {

getHome : eh.catchAsyncMVC(async (req, res) => {
  console.log('soy sesion: ', req.session.isAuthenticated)
  const info = await serv.getHome();
  res.render("index", { info , isAuthenticated: req.session.isAuthenticated });
}),

getDetailById : eh.catchAsyncMVC(async (req, res) => {
  const { id } = req.params;
  const response = await serv.getById(id);
  res.render(`detalles`, response);
}),

//{info, items}
getDetailImage : eh.catchAsyncMVC(async (req, res) => {
  const { img, id } = req.query;
  const item = await serv.getDetail(id)
  res.render(`card`, { img, item });
}),

getContact : eh.catchAsyncMVC(async (req, res)=>{
  res.render('contact')
}),

aboutMe : eh.catchAsyncMVC(async(req, res)=>{
  res.render('acerca')
}),

};

