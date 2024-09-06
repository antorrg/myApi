import serv from "../../controllers/homePageServ/index.js";


const updController = async (req, res) => {
  const {id}= req.params;
  const newData = req.body;
  console.log('soy id: ',id)
  console.log('soy newData: ',newData)
  const response = await serv.updHome(id, newData)
  res.status(200).json(response)
};

const detailUpdController = async (req, res) => {
  const {id}= req.params;
  const newData = req.body;
  const response = await serv.updItem(id, newData )
  res.status(200).json(response)
};

export { updController, detailUpdController };
