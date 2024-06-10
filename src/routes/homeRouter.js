import express from 'express'
import ctr from '../controllers/homeControllers/index.js'
import mid from '../middlewares/homeMiddlewares/index.js'
const homeRouter = express.Router()

homeRouter.get('/', ctr.getHome);


homeRouter.get('/album/:id', ctr.getDetailById) 

homeRouter.get('/album', ctr.getDetailImage) 

homeRouter.post('/create', mid.createMidd, ctr.createController)

//homeRouter.get('/about', )

 
  


export default homeRouter;