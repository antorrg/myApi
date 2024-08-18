import {Holder} from '../../db.js'
import bcrypt from 'bcrypt'

export const verifyPass = async(id, password)=>{
	try{
		const user = await Holder.findByPk(id)
		if(!user){const error = new Error('Usuario no encontrado'); error.status = 404; throw error};
		const passwordMatch = await bcrypt.compare(password, user.password);
		if(!passwordMatch){const error = new Error('Contraseña no valida'); error.status = 400; throw error};
		return {message: '¡Contraseña verificada exitosamente!'}
	}catch(error){
		throw error;
	}
};

export const userChangePass = async(id, password)=>{
	try{
		const user = await Holder.findByPk(id)
		if(!user){const error = new Error('Usuario no hallado'); error.status = 404; throw error};
		const hashedPassword = await bcrypt.hash(password, 12)
		const newData = {password: hashedPassword}
		await user.update(newData)
		return '¡Contraseña actualizada exitosamente!'
	}catch(error){
		throw error;
	}
}

