import serv from "../../controllers/homePageServ/index.js";
import { uploadImageToFirebase } from "../../utils/uploadService.js";

export const createController = async (req, res) => {
  const info = req.body;
  const response = await serv.createHome(info);
  res.status(201).json(response);
};

 export const createItemController = async (req, res) => {
   let { img, text, id} = req.body;
   const file = req.file;
   let imageUrl = img;
   if(file){
      imageUrl = await uploadImageToFirebase(file)
   }
   const info = {img: imageUrl, text, id}
   const response = await serv.addNewItem(info)
   res.status(201).json(response)
 }
