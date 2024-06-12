import dotenv from 'dotenv' 
dotenv.config()

const {PORT, DB_USER, DB_PASSWORD,DB_HOST, DB_NAME, DB_DEPLOY, USER_IMG, SECRET_KEY }=process.env;

export default {
    Port : PORT,
    ConnectDb : `${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
    RenderDb : DB_DEPLOY,
    UserImg : USER_IMG,
    SecretKey : SECRET_KEY,
}
