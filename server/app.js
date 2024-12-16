import express from 'express'
import { fileURLToPath } from 'url';
import path from 'path'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import mainRouter from './routes/mainRouter.js'
import env from './envConfig.js'
import midd from './utils/errors/index.js'
import {sessionMiddle} from './utils/validation/sessionMiddle.js'
import verifyAuth from './utils/validation/verifyAuth.js'


//Constant for path:
const rootDirname = path.resolve()
const app = express();

app.use(morgan('dev'))
// app.use(helmet({
//         contentSecurityPolicy: {
//             useDefaults: true,
//             directives: {
//                 defaultSrc: ["'self'"],
//                 //scriptSrc: ["'self'", (req, res) => `'nonce-${res.locals.nonce}'`],
//                 imgSrc: ["'self'", 'https://firebasestorage.googleapis.com', 'data:'],
//                 // Agregar otras directivas según sea necesario
//             },
//         },
//     })
// );
// const corsOptions = {
//     origin: '*', // Reemplaza con el origen de tu frontend
//     credentials: true, // Permitir el envío de credenciales (cookies, headers de autorización, etc.)
// };
app.use(sessionMiddle)
//app.use(cors(corsOptions))

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(midd.validJson)
app.use(verifyAuth);
app.use(mainRouter)

// Aqui se declara el servidor mvc.
const viewPath = env.Status === 'production' 
? path.join(rootDirname, 'dist/views')
  : path.join(rootDirname, 'src/views'); 

app.set("views", viewPath)
app.set("view engine", "pug")

const staticPath = env.Status === 'production' 
   ? path.join(rootDirname, 'dist')
  : path.join(rootDirname, 'src/public'); 

app.use(express.static(staticPath))

app.use(midd.lostRoute);

app.use(midd.errorEndWare);

export default app;