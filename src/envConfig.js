import dotenv from 'dotenv' 
dotenv.config()

const {PORT, URL,DB_USER, DB_PASSWORD,DB_HOST, DB_NAME, DB_DEPLOY }=process.env;

export default {
    Port : PORT,
    Url :URL,
    ConnectDb : `${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
    RenderDb : DB_DEPLOY
}
