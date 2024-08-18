import dotenv from 'dotenv' 
dotenv.config()
const envFile = process.env.NODE_ENV === 'production' ? '.env.production': '.env.development';
dotenv.config({ path: envFile });

const {PORT, DB_USER, DB_PASSWORD,DB_HOST, DB_NAME, DB_DEPLOY, USER_IMG, SECRET_KEY, DATABASE_URL, GMAIL_USER, GMAIL_APP_PASS, USER_EMAIL,USER_PASS, DEFAULT_PASS }=process.env;

const LocalDb =`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`

const ConnectDb = process.env.NODE_ENV==='production'? DATABASE_URL:  LocalDb ;
const Status= process.env.NODE_ENV==='production'? 'in production': 'in development';


export default {
    Port : PORT,
    Status,
    ConnectDb,
    optionRender: process.env.NODE_ENV==='development'? false : true,
    UserImg : USER_IMG,
    SecretKey : SECRET_KEY,
    GmailUser: GMAIL_USER,
    GmailPass: GMAIL_APP_PASS,
    UserEmail: USER_EMAIL,
    UserPass: USER_PASS,
    DefaultPass : DEFAULT_PASS,
}