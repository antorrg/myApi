import serv from "../../controllers/homePageServ/index.js";

const createController = async (req, res) => {
  const { title, landing, logo, info_header, info_body, url, items } = req.body;

  const response = await serv.createHome(
    title,
    landing,
    logo,
    info_header,
    info_body,
    url,
    items
  );
  res.status(201).json(response);
};
 const createItemController = async (req, res) => {
   const {img, text, id} = req.body;
   const response = await serv.addNewItem(img, text, id)
   res.status(201).json(response)
 }
export {
createController,
createItemController,
};