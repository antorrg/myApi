import {Holder} from '../../db.js'
import bcrypt from 'bcrypt'
import env from '../../envConfig.js'
import holderParser from './helpers/holderParser.js';


export default async function userCreate (email1, password1) {
    try {
        const holderFound = await Holder.findOne({
            where: {
                email: email1,
            }
        });
    if(holderFound){const error = new Error('This user already exists!'); error.status = 400; throw error;}
    //preparacion de variables:
    const hashedPassword = await bcrypt.hash(password1, 12)
    const nickname1 = email1.split('@')[0]
    //creacion de holder (superUser)
    const newHolder = await Holder.create({
        email: email1,
        password: hashedPassword,
        nickname: nickname1,
        given_name: "",
        picture: `${env.UserImg}`,
    });
    if(!newHolder){const error = new Error('Unexpected server error!'); error.status = 500; throw error;}
    return holderParser(newHolder, true);
    } catch (error) {
        throw error;
    }
};
