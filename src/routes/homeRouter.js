import express from 'express'
import ctr from '../controllers/homeControllers/getControllers.js'
const homeRouter = express.Router()

homeRouter.get('/', ctr.getHome);


homeRouter.get('/album/:id', ctr.getDetailById) 

homeRouter.get('/album', ctr.getDetailImage) 

 
  


export default homeRouter;