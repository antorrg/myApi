import {Holder} from '../../db.js'


export default async function userDel (id) {
    try{
    	const user = await Holder.findByPk(id)
		if(!user){const error = new Error('Usuario no hallado'); error.status = 404; throw error};
		await user.destroy(id)
		return {message: 'Usuario borrado exitosamente'};
    }catch(error){
    	throw error;
    }
}