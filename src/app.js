import express from 'express'
import { fileURLToPath } from 'url';
import path from 'path'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import crypto from 'crypto'
import mainRouter from './routes/mainRouter.js'
import midd from './utils/errors/index.js'
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
app.use(helmet({
        contentSecurityPolicy: {
            useDefaults: true,
            directives: {
                defaultSrc: ["'self'"],
                //scriptSrc: ["'self'", (req, res) => `'nonce-${res.locals.nonce}'`],
                imgSrc: ["'self'", 'https://firebasestorage.googleapis.com', 'data:'],
                // Agregar otras directivas según sea necesario
            },
        },
    })
);

app.use(cors())
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'views')))
app.use(express.static(path.join(__dirname, "public")));
app.use('/detalles', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(midd.validJson)
app.use(mainRouter)


app.use(midd.lostRoute);

app.use(midd.errorEndWare);

export default app;