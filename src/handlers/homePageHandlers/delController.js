import serv from "../../controllers/homePageServ/index.js";

const delController = async (req, res) => {
  const {id}= req.params;
  const response = await serv.delHome(id)
  res.status(200).json(response)
};

export default delController;
