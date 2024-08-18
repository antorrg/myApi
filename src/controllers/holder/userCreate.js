import {Holder} from '../../db.js'
import bcrypt from 'bcrypt'
import env from '../../envConfig.js'
import holderParser from './helpers/holderParser.js';


export default async function userCreate (email1, password, role,) {
    const passSelected = env.DefaultPass? env.DefaultPass : password;
    try {
        const holderFound = await Holder.findOne({
            where: {
                email: email1,
            }
        });
    if(holderFound){const error = new Error('¡Este usuario ya existe!'); error.status = 400; throw error;}
    //preparacion de variables:
    const hashedPassword = await bcrypt.hash(passSelected, 12)
    const nickname1 = email1.split('@')[0]
    //creacion de holder (superUser)
    const newHolder = await Holder.create({
        email: email1,
        password: hashedPassword,
        nickname: nickname1,
        given_name: "",
        role: role || 1,
        picture: `${env.UserImg}`,
    });
    if(!newHolder){const error = new Error('Error inesperado en el servidor!'); error.status = 500; throw error;}
    return holderParser(newHolder, true);
    } catch (error) {
        throw error;
    }
};
