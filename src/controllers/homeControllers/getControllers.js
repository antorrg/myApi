import {info, items} from './helpers/database.js'

export default {
 getHome : async (req, res) => {
     res.render('index');
 },

 getDetailById : async (req, res) => {
    const {id}= req.params;
    res.render(`album${id}`, {info, items})
    
 },

 getDetailImage : async (req, res)=>{
    const {img, id} = req.query;
    console.log('query ', img, id) 
      res.render(`card`, {img, id})
 },
};
