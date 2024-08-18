import express from 'express'
import { fileURLToPath } from 'url';
import path from 'path'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import crypto from 'crypto'
import mainRouter from './routes/mainRouter.js'
import midd from './utils/errors/index.js'
import {sessionMiddle} from './utils/validation/sessionMiddle.js'
import verifyAuth from './utils/validation/verifyAuth.js'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//const __dirname = path.dirname(new URL(import.meta.url).pathname);
//console.log(__dirname)
const app = express();
// app.use((req, res, next) => {
//     res.locals.nonce = crypto.randomBytes(16).toString('hex');
//     console.log('Generated Nonce:', res.locals.nonce); 
//     next();
//   });

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
const corsOptions = {
    origin: '*', // Reemplaza con el origen de tu frontend
    credentials: true, // Permitir el envío de credenciales (cookies, headers de autorización, etc.)
};
app.use(sessionMiddle)
app.use(cors(corsOptions))
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, 'views')))
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static('public', {
    setHeaders: (res, path, stat) => {
      if (path.endsWith('.js')) {
        res.set('Content-Type', 'application/javascript');
      }
    }
  }));
app.use(express.static(path.join(__dirname, "views/errors")));
app.use('/detalles', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(midd.validJson)
app.use(verifyAuth);
app.use(mainRouter)


app.use(midd.lostRoute);

app.use(midd.errorEndWare);

export default app;