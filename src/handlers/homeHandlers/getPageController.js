import serv from "../../controllers/homeServ/index.js";


const getPageHand =  async (req, res) => {
      const response = await serv.getHome();
      res.status(200).json(response);
    
  };

  const getPageById =  async (req, res) => {
    const { id } = req.params;
      const response = await serv.getById(id);
      res.status(200).json(response);
    
  };

  export {
    getPageHand,
    getPageById
  }