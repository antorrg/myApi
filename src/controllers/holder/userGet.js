import {Holder} from '../../db.js'
import holderParser from './helpers/holderParser.js';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 3600 }); // TTL (Time To Live) de una hora


   export const getAllUsers = async ()=>{
        try{
            const holderFound = await Holder.findAll()
            if(!holderFound){const error = {message: 'Unexpected error. Users not found', status : 500}; throw error}
            if(holderFound.length===0){const error = {message: 'Users not found', status : 404}; throw error}
            return holderParser(holderFound, false)
        }catch(error){
            throw error
        }
    };
 export const getUsersById = async(id)=>{
        try {
            // Intento obtener los datos del caché
          let cachedUser = cache.get(`userById_${id}`);
          if (cachedUser) {
                     return cachedUser
                  }
            const holderFound = await Holder.findByPk(id)
            if(!holderFound){const error = {message: 'Unexpected error. User not found', status: 404}; throw error}
            const userDetail = holderParser(holderFound, true)
            cache.set(`userById_${id}`, userDetail)
            return userDetail
        } catch (error) {
            throw error
        }
    };
