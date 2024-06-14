import express from 'express'
import homeRouter from './homeRouter.js'
import holderRouter from './holderRouter.js'
import pageRouter from './pageRouter.js'

const mainRouter = express.Router()

mainRouter.use(homeRouter)

mainRouter.use('/api/v3/', holderRouter)
mainRouter.use('/api/v3/', pageRouter)

mainRouter.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    res.render('error', { message: err.message, status: err.status || 500 });
  });

export default mainRouter;