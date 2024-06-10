import {info, items} from './helpers/database.js'


 const getHome = async (req, res) => {
     res.render('index');
 };

 const getDetailById = async (req, res) => {
    const {id}= req.params;
    res.render(`album${id}`, {info, items})
    
 }

 const getDetailImage = async (req, res)=>{
    const {img, id} = req.query;
    //console.log('query ', img, id) 
      res.render(`card`, {img, id})
 }

 export{
   getHome,
   getDetailById,
   getDetailImage
 }

