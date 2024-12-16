import serv from "../../controllers/homePageServ/index.js";


export const createController = async (req, res) => {
  const info = req.body;
  const response = await serv.createHome(info);
  res.status(201).json(response);
};

 export const createItemController = async (req, res) => {
   const info = req.body; 
   const response = await serv.addNewItem(info)
   res.status(201).json(response)
 }
