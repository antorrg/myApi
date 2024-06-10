
const createMidd = (req, res, next) => {
    const {title, info_header, info_body, url, items } = req.body;
    if(!title){return res.status(400).json({error: 'missing parameter'})}
    if(!info_header){return res.status(400).json({error: 'missing parameter'})}
    if(!info_body){return res.status(400).json({error: 'missing parameter'})}
    if(!url){return res.status(400).json({error: 'missing parameter'})}
    if(!items){return res.status(400).json({error: 'missing parameter'})}
    if(items.length ===0){return res.status(400).json({error: 'missing parameter'})}
    next();
};

export default createMidd