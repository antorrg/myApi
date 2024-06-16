import {Sequelize} from 'sequelize'
import models from './models/index.js'
import env from './envConfig.js'

const sequelize = new Sequelize(env.RailwayDb,{
 logging:false,          
 native: false,
});

//LocalDb
//RailwayDb
// const sequelize = new Sequelize(`${env.RenderDb}`, {
//     logging: false, // set to console.log to see the raw SQL queries
//      native: false, // lets Sequelize know we can use pg-native for ~30% more speed
//     dialectOptions: {
//      ssl: {
//         require: true,
//        }    
//      }
//    });

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