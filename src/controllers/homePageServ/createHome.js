import {Home, Item, sequelize} from '../../db.js'

export const createHome = async (info) => {
    console.log(info)
    //const {title, landing, logo, info_header, info_body, url, items}=info
    let transaction;
    try {
        transaction = await sequelize.transaction();
        const product = await Home.findOne({
            where:{title : info.title

            }, transaction

        });
        if(product){const error = new Error('This title already exists'); error.status = 400; throw error};
        const newProduct = await Home.create({
            title:info.title,
            landing: info.landing,
            logo:info.logo,
            info_header:info.info_header,
            info_body:info.info_body,
            url:info.url,
        },{transaction});  
        const createdItems = await Promise.all(
            info.items.map(async(item)=> {
                const newItem = await Item.create({
                    img : item.img,
                    text: item.text,
                },{transaction})

            await newProduct.addItem(newItem, {transaction})    
             return newItem;
            })
        );
        await transaction.commit()
        return {info: newProduct,
                items: createdItems
               }
    } catch (error) {
        if (transaction) { await transaction.rollback();}
      throw error;
    }
}

export const addNewItem = async (info) => {
    const {img, text, id}= info;
    try {
        const homeFound = await Home.findByPk(id);
        if(!homeFound){const error = new Error('Ocurrio un error, objeto no encontrado'); error.status = 500; throw error};
      const newItem = await Item.create({
         img:img,
         text: text,
      })
      await homeFound.addItem(newItem)
      return homeFound
    } catch (error) {
        throw error;
    }
}
