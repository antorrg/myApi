import serv from "../../controllers/homePageServ/index.js";
import {uploadImageToFirebase} from '../../utils/uploadService.js'


const updController = async (req, res) => {
  const {id}= req.params;
  const newData = req.body;
  const response = await serv.updHome(id, newData)
  res.status(200).json(response)
};

const detailUpdController = async (req, res) => {
  const {id}= req.params;
 const file = req.file;
  let { img, text, enable } = req.body;
  try{
  let imageURL = img; // URL existente o nueva
  if (file) {
    imageURL = await uploadImageToFirebase(file);
  }
  //console.log('soy imageURL: ',imageURL)
  const newData = {img: imageURL, text, enable}
  const response = await serv.updItem(id, newData )
  res.status(200).json(response)
}catch(error){
  console.error('aca viene el error: ', error)
  res.status(error.status || 500).json({error:error.message})
}
};

export { updController, detailUpdController };
