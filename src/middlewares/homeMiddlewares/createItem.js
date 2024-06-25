
const createItem = (req, res, next) => {
    const {img, text, id } = req.body;
    console.log(img)
    if(!img){return res.status(400).json({error: 'missing parameter'})}
    if(!text){return res.status(400).json({error: 'missing parameter'})}
    if(!id){return res.status(400).json({error: 'missing parameter'})}
    
    next();
};

export default createItem