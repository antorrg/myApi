import express from 'express'
import h from '../controllers/userControllers/index.js'
const userRouter = express.Router()

userRouter.get('/user', (req, res)=>res.json({"name": "antonio",
    "apellido": "rodriguez"
}))

export default userRouter;