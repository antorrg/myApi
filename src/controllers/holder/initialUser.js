import {Holder} from '../../db.js'
import env from '../../envConfig.js'
import userCreate from './userCreate.js'

const initialUser = async ()=>{
    const email = env.UserEmail
    const password = env.UserPass
    const role = 9;
    try {
        const users = await Holder.findAll()
        if(users.length >0){
            return console.log('The user already exists!')
        }
        const superUser = await userCreate(email, password, role)
        if(!superUser){const error = error; error.status = 500; throw error}
        return console.log('The user was successfully created!!')
    } catch (error) {
        console.error('Algo ocurrió al inicio: ', error)
    }
}
export default initialUser;