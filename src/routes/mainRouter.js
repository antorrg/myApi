import express from 'express'
import homeRouter from './homeRouter.js'
import userRouter from './userRouter.js'

const mainRouter = express.Router()

mainRouter.use(homeRouter)
mainRouter.use('/api', userRouter)


export default mainRouter;