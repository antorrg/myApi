import {Holder} from '../../db.js'
import bcrypt from 'bcrypt'

export const verifyPass = async(id, password)=>{
	try{
		const user = await Holder.findByPk(id)
		if(!user){const error = new Error('User not found'); error.status = 404; throw error};
		const passwordMatch = await bcrypt.compare(password, user.password);
		if(!passwordMatch){const error = new Error('Incorrect password'); error.status = 400; throw error};
		return {message: 'Password successfully verified'}
	}catch(error){
		throw error;
	}
};

export const userChangePass = async(id, password)=>{
	try{
		const user = await Holder.findByPk(id)
		if(!user){const error = new Error('User not found'); error.status = 404; throw error};
		const hashedPassword = await bcrypt.hash(password, 12)
		const newData = {password: hashedPassword}
		await user.update(newData)
		return 'Password updated successfully'
	}catch(error){
		throw error;
	}
}

