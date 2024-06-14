import dotenv from 'dotenv' 
dotenv.config()

const {PORT, DB_USER, DB_PASSWORD,DB_HOST, DB_NAME, DB_DEPLOY, USER_IMG, SECRET_KEY, DB_DATABASE }=process.env;

export default {
    Port : PORT,
    LocalDb : `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
    RailwayDb: DB_DATABASE,
    RenderDb : DB_DEPLOY,
    UserImg : USER_IMG,
    SecretKey : SECRET_KEY,
}
