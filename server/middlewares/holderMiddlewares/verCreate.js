const verCreate = (req, res, next)=>{
    const {title, logo, landing, info_header, info_body, url, enable}=req.body
    console.log('title: ', title)
    console.log('logo: ', logo)
    console.log('landing: ',landing)
    console.log('infoHeader', info_header)
    if(!title){return console.error('falta title')}
    if(!logo){return console.error('falta title')}
    if(!landing){return console.error('falta title')}
    if(!info_header){return console.error('falta info_header')}
    if(!info_body){return console.error('falta info_body')}
    if(!url){return console.error('falta url')}
    if(!enable){return console.error('falta enable')}
    next()
}


export default verCreate