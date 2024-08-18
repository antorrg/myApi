import {Sequelize} from 'sequelize'
import models from './models/index.js'
import env from './envConfig.js'

const sequelize = new Sequelize(env.ConnectDb,{
 logging:false,          
 native: false,
 dialectOptions: env.optionRender? {
    ssl: {
       require: true,
      }    
    } : {}
});



Object.values(models).forEach((model)=>model(sequelize));

const {
    Holder,
    Home,
    Item,
}= sequelize.models;

//Asociations:
Home.hasMany(Item)
Item.belongsTo(Home)

export {
    Holder,
    Home,
    Item,
    sequelize,
}