import axios from 'axios'
import env from '../../envConfig.js'
import er from '../../utils/errors/index.js'

export default {
    getAllUsers : async ()=>{
        try{
        const response = await axios(`${env.Url}`)
        const data =response.data;
        if(!data){const error = new Error('Data not found'); error.status= 500; throw error}
        }catch(error){
            throw error
        }
    }
}