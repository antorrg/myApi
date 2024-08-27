import serv from "../../controllers/homePageServ/index.js";
import {uploadImageToFirebase} from '../../utils/uploadService.js'


const updController = async (req, res) => {
  const {id}= req.params;
  const fileLogo = req.files['fileLogo'] ? req.files['fileLogo'][0] : null;
  const fileLanding = req.files['fileLanding'] ? req.files['fileLanding'][0] : null;
  let{logo, landing, title, info_header, info_body, url, enable}=req.body;

  let imageLogo = logo;
  if (fileLogo) {imageLogo = await uploadImageToFirebase(fileLogo)}

  let imageLanding= landing;
  if (fileLanding) { imageLanding = await uploadImageToFirebase(fileLanding)}
  
  const newData = {logo : imageLogo, landing : imageLanding, title, info_header, info_body, url, enable};
  const response = await serv.updHome(id, newData)
  res.status(200).json(response)
};

const detailUpdController = async (req, res) => {
  const {id}= req.params;
 const file = req.file;
  let { img, text, enable } = req.body;
  let imageURL = img; // URL existente o nueva
  if (file) {
    imageURL = await uploadImageToFirebase(file);
  }
  //console.log('soy imageURL: ',imageURL)
  const newData = {img: imageURL, text, enable}
  const response = await serv.updItem(id, newData )
  res.status(200).json(response)
};

export { updController, detailUpdController };
