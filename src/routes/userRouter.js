import express from 'express'
import h from '../controllers/userControllers/index.js'
import * as ff from '../services/homeServ/getHome.js'
const userRouter = express.Router()

userRouter.get('/user', (req, res)=>res.json({"name": "antonio",
    "apellido": "rodriguez"
}))
userRouter.get('/user/pepito', async(req, res)=>{
    try{
 const response = await ff.getHome()
 res.status(200).json(response)
    }catch(error){
        res.status(error.status || 500).json({error: error.message})
    }
})
userRouter.get('/user/pepito/:id', async(req, res)=>{
    const {id}=req.params;
    try{
 const response = await ff.getById(id)
 res.status(200).json(response)
    }catch(error){
        res.status(error.status || 500).json({error: error.message})
    }
})
export default userRouter;