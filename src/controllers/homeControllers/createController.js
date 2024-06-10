import serv from '../../services/homeServ/index.js'


const createController = async (req, res) => {
    const {title, info_header, info_body, url, items } = req.body;
    
    const response = await serv.createHome(title, info_header, info_body, url, items)
    res.status(201).json(response)
};

export default createController