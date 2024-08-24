import serv from "../../controllers/homePageServ/index.js";

const delController = async (req, res) => {
  const {id}= req.params;
  //console.log(id);
  const response = await serv.delHome(id)
  console.log(response)
  res.status(200).json(response)
};

export default delController;
