import {Home, Item, sequelize} from '../../db.js'

const createHome = async (title, info_header, info_body, url, items ) => {
    let transaction;
    try {
        transaction = await sequelize.transaction();
        const product = await Home.findOne({
            where:{title : title.toLowerCase()

            }, transaction

        });
        if(product){const error = new Error('This title already exists'); error.status = 400; throw error};
        const newProduct = await Home.create({
            title:title,
            info_header:info_header,
            info_body:info_body,
            url:url,
        },{transaction});  
        const createdItems = await Promise.all(
            items.map(async(item)=> {
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

export default createHome
