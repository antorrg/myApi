import dotenv from 'dotenv' 
dotenv.config()
const envFile = process.env.NODE_ENV === 'production' ? '.env.production': '.env.development';
dotenv.config({ path: envFile });

const {PORT, DB_USER, DB_PASSWORD,DB_HOST, DB_NAME, DB_DEPLOY, USER_IMG, SECRET_KEY, DATABASE_URL, GMAIL_USER, GMAIL_APP_PASS, USER_EMAIL,USER_PASS, DEFAULT_PASS, API_KEY,PROJECT_ID, AUTH_DOMAIN, STORAGE_BUCKET, MESSAGIN_SEND_ID, APP_ID, MEASUREMENT_ID }=process.env;

const LocalDb =`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`

const ConnectDb = process.env.NODE_ENV==='production'? DATABASE_URL:  LocalDb ;
const Status= process.env.NODE_ENV==='production'? 'production': 'development';


export default {
    Port : PORT,
    Status,
    ConnectDb,
    optionRender: process.env.NODE_ENV==='development'? false :false,
    secureSession: process.env.NODE_ENV==='production'? true :false,
    UserImg : USER_IMG,
    SecretKey : SECRET_KEY,
    GmailUser: GMAIL_USER,
    GmailPass: GMAIL_APP_PASS,
    UserEmail: USER_EMAIL,
    UserPass: USER_PASS,
    DefaultPass : DEFAULT_PASS,
    fireApiK:API_KEY,
    firePId: PROJECT_ID,
    fireDomain: AUTH_DOMAIN,
    fireStoreBuck: STORAGE_BUCKET,
    fireMess : MESSAGIN_SEND_ID,
    fireAppId: APP_ID,
    fireMeasure: MEASUREMENT_ID,


}
//   authDomain: process.env.AUTH_DOMAIN,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGIN_SEND_ID,
//   appId: process.env.APP_ID,
//   measurementId

// API_KEY=AIzaSyB2Ao8N6W4E3K7WDvjGfbLX1TRSsZhxVHA
// AUTH_DOMAIN=misitioweb-d59d3.firebaseapp.com
// PROJECT_ID=misitioweb-d59d3
// STORAGE_BUCKET=misitioweb-d59d3.appspot.com
// MESSAGIN_SEND_ID=448955668633
// APP_ID=1:448955668633:web:7410fa47b1ab43fd2f0008
// MEASUREMENT_ID=G-EG9XFFYY1R