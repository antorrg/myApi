import express from 'express'
import homeRouter from './homeRouter.js'
import holderRouter from './holderRouter.js'
import pageRouter from './pageRouter.js'

const mainRouter = express.Router()

mainRouter.use(homeRouter)

mainRouter.use('/api/v3/', holderRouter)
mainRouter.use('/api/v3/', pageRouter)


export default mainRouter;