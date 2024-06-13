
const homeCleaner = (data, isObj)=>{
    return isObj? cleaner(data, true): data.map((dat)=>cleaner(dat, false))
}

const cleaner = (cont, bl)=>{
     const items  = cont.Items.map((it)=> aux(it))
    const info = {
        id:cont.id,
        title:cont.title,
        landing: cont.landing,
        logo:cont.logo,
        infoHeader: cont.info_header,
        infoBody: cont.info_body,
        url: cont.url,
        enable: cont.enable,
    };
    return bl? {info, items} : info
      
    
};
const aux = (info)=>{
    return {
        id: info.id,
        img: info.img,
        text: info.text,
        homeId: info.HomeId,
        enable: info.enable,
    }
};

export default homeCleaner;