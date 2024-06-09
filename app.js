import express from 'express'
import { fileURLToPath } from 'url';
import path from 'path'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import mainRouter from './src/routes/mainRouter.js'
import midd from './src/utils/errors/index.js'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//const __dirname = path.dirname(new URL(import.meta.url).pathname);
console.log(__dirname)
const app = express();

app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, 'src/views')))
app.use(express.static(path.join(__dirname, "src/public")));
app.use('/album/assets', express.static(path.join(__dirname, 'src/public/assets')));
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(midd.validJson)
app.use(mainRouter)


app.use(midd.lostRoute);

app.use(midd.errorEndWare);

export default app;