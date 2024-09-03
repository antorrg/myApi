import express from 'express'
import homeRouter from './homeRouter.js'
import holderRouter from './holderRouter.js'
import pageRouter from './pageRouter.js'
import userRouter from './userRouter.js'

const mainRouter = express.Router()

mainRouter.use(homeRouter)
mainRouter.use(userRouter)

mainRouter.use('/api/v3/', holderRouter)
mainRouter.use('/api/v3/', pageRouter)


// Manejador de Rutas No Encontradas para MVC
// mainRouter.use((req, res, next) => {
//   if (req.originalUrl.startsWith('/api/v3/')) {
//     // Si es una ruta de la API, pasa al siguiente middleware
//     return next();
//   }
//   const err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // Manejador de Errores para MVC
// mainRouter.use((err, req, res, next) => {
//   if (req.originalUrl.startsWith('/api/v3/')) {
//     // Si es una ruta de la API, pasa al siguiente middleware
//     return next(err);
//   }
//   res.status(err.status || 500);
//   res.render('error', { message: err.message, status: err.status || 500 });
// });

// Manejador de Rutas No Encontradas para API REST
mainRouter.use('/api/v3/*', (req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// Manejador de Errores para API REST
mainRouter.use('/api/v3/*', (err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});


// mainRouter.use((err, req, res, next) => {
//     const err = new Error('Not Found');
//     err.status = 404;
//     res.render('error', { message: err.message, status: err.status || 500 });
//   });

export default mainRouter;