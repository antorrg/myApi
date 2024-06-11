import {Home, Item} from '../../db.js'
import homeCleaner from '../../utils/cleaners/homeCleaner.js'

const getHome = async () => {
    try {
        const dataFound = await Home.findAll({
            where : {
                deleteAt: false,
            },
             include :[
                {
                model: Item,
                attributes:['id', 'img', 'text', 'HomeId'],
           },
        ],
        })
        if(dataFound.length === 0){const error = new Error('Data not found'); error.status = 404; throw error;}
        const data = homeCleaner(dataFound, false)
        return data
      
    } catch (error) {
        throw error;
    }
    
}
const getById = async (id) => {
    try {
        const data = await Home.findByPk(id,{
            where:{
                deleteAt:false,
            },
                include : [ 
                    {
                    model: Item,
                    attributes: ['id', 'img', 'text', 'HomeId'],
                }
            ]
        })
        if(!data){const error = new Error('Data not found'); error.status = 404; throw error;}
        const dataFound = homeCleaner(data, true)
        return dataFound
    } catch (error) {
        throw error;
    }
}
const getDetail = async (arg) => {
    //const name = await 
}

export {
    getHome,
    getById,
    getDetail,
}