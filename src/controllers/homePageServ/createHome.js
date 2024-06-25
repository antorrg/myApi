import {Home, Item, sequelize} from '../../db.js'

export const createHome = async (title1, landing1, logo1, info_header1, info_body1, url1, items1 ) => {
    let transaction;
    try {
        transaction = await sequelize.transaction();
        const product = await Home.findOne({
            where:{title : title1

            }, transaction

        });
        if(product){const error = new Error('This title already exists'); error.status = 400; throw error};
        const newProduct = await Home.create({
            title:title1,
            landing: landing1,
            logo:logo1,
            info_header:info_header1,
            info_body:info_body1,
            url:url1,
        },{transaction});  
        const createdItems = await Promise.all(
            items1.map(async(item)=> {
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

export const addNewItem = async (img, text, id) => {
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
