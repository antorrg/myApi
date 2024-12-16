
export default function updHome (req, res, next){
    const {title, landing, logo, info_header, info_body, url } = req.body;

    if(!title){return res.status(400).json({error: 'missing parameter'})}
    if(!landing){return res.status(400).json({error: 'missing parameter'})}
    if(!logo){return res.status(400).json({error: 'missing parameter'})}
    if(!info_header){return res.status(400).json({error: 'missing parameter'})}
    if(!info_body){return res.status(400).json({error: 'missing parameter'})}
    if(!url){return res.status(400).json({error: 'missing parameter'})}
    
    next();
}



    