import {Holder} from '../../db.js'
import bcrypt from 'bcrypt'
import holderParser from './helpers/holderParser.js';
import throwError from '../../utils/errors/formatError.js';
import jwt from '.././../utils/validation/jwt.js'



export default async function userLog (email1, password1) {
    try {
        const hold = await Holder.findOne({
            where: {
                email: email1,
            }
        });
    if(!hold || hold === undefined){throwError('¡Este usuario no existe!', 400)}
    //verificacion de password:
    const passwordMatch = await bcrypt.compare(password1, hold.password)
    if(!passwordMatch){const error = {message:'¡Contraseña no valida!', status : 400}; throw error;}
    return {
        user: holderParser(hold, true),
        token: jwt.generateToken(hold),
          };
    } catch (error) {
        throw error;
    }
}