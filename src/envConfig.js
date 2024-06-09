import dotenv from 'dotenv' 
dotenv.config()

const {PORT, URL, }=process.env;

export default {
    Port : PORT,
    Url :URL,
}