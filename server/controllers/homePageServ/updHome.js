import {Home, Item} from '../../db.js'

export const updHome = async (id, newData) => {
   
    try {
        const homeFound = await Home.findByPk(id);
        if(!homeFound){const error = new Error('Unexpected error, page not found'); error.status = 500; throw error}
        const parsedData = {
            title: newData.title,
            logo: newData.logo,
            landing: newData.landing,
            info_header: newData.info_header,
            info_body: newData.info_body,
            url: newData.url,
            enable: Boolean(newData.enable),
            deleteAt: Boolean(newData.deleteAt)
        }
        const homeUpd = await homeFound.update(parsedData)
        return homeUpd;
    } catch (error) {
        throw error;
    }
}

export const updItem = async (id, newData)=>{
    try {
        const itemFound = await Item.findByPk(id);
    if(!itemFound){const error = new Error('Unexpected error, item not found'); error.status = 500; throw error}
    const parsedData = {
        img: newData.img,
        text: newData.text,
        enable: Boolean(newData.enable)
    }
    const itemUpd = itemFound.update(parsedData)
    return itemUpd
    } catch (error) {
        throw error;
    }
}
