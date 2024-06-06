import express from 'express'

const userRouter = express.Router()

userRouter.get('/api/', (req, res)=>res.json({"name": "antonio",
    "apellido": "rodriguez"
}))

export default userRouter;