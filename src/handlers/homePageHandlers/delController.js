import serv from "../../controllers/homePageServ/index.js";

export const delHomeController = async (req, res) => {
  const {id}= req.params;
  const response = await serv.delHome(id)
  console.log(response)
  res.status(200).json(response)
};

export const delItemController = async (req, res) => {
  const {id}= req.params;
  const response = await serv.delItem(id)
  console.log(response)
  res.status(200).json(response)
};


