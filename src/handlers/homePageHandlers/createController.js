import serv from "../../controllers/homePageServ/index.js";
import { uploadImageToFirebase } from "../../utils/uploadService.js";

export const createController = async (req, res) => {
  const { logo, landing, title, info_header, info_body, url, items } = req.body;
  console.log('Info: ', title)
 
  const fileLogo = req.files['fileLogo'] ? req.files['fileLogo'][0] : null;
  let imgLogo = logo; // URL existente o nueva
    if (fileLogo) {
  imgLogo = await uploadImageToFirebase(fileLogo);
   }
  const fileLanding = req.files['fileLanding'] ? req.files['fileLanding'][0] : null;
    let imgLand = landing // URL existente o nueva
   if (fileLanding) {
     imgLand = await uploadImageToFirebase(fileLanding);
    }
  
  // const texts = items.map(item=>item.text)
  //  const itemSave = []; 

  //  for (let i = 0; i < 3; i++) {
  //    const image = req.files[`items[${i}][image]`] ? req.files[`items[${i}][image]`][0] : null;
  //    const text = texts[i];
  
  //    if (image) {
  //      const img = await uploadImageToFirebase(image) 
  //      itemSave.push({ img, text }); // Agrega un objeto con la URL de la imagen y el texto al array `items`.
  //    } else {
  //      itemSave.push({ img: null, text }); // Si no hay imagen, se agrega un objeto con img como null y el texto.
  //    }
  //  }
   const info =  { title,
    landing : imgLand,
    logo: imgLogo,
    info_header,
    info_body,
    url,
    //items: itemSave
    }
    console.log('Yo soy la info',info)
  //const response = await serv.createHome(info);
  //return res.status(201).json(response);
  return res.status(201).send('todo ok');
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
