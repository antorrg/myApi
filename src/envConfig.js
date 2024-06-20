import dotenv from 'dotenv' 
dotenv.config()

const {PORT, DB_USER, DB_PASSWORD,DB_HOST, DB_NAME, DB_DEPLOY, USER_IMG, SECRET_KEY, DATABASE_URL, GMAIL_USER, GMAIL_APP_PASS,}=process.env;

export default {
    Port : PORT,
    LocalDb : `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
    RailwayDb: DATABASE_URL,
    RenderDb : DB_DEPLOY,
    UserImg : USER_IMG,
    SecretKey : SECRET_KEY,
    GmailUser: GMAIL_USER,
    GmailPass: GMAIL_APP_PASS,
}
