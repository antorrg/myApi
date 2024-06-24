import {Holder} from '../../db.js'


export default async function userUpd (id, newData) {
    try{
    	const holder = await Holder.findByPk(id)
		if(!holder){const error = new Error('User not found'); error.status = 404; throw error};
		const nickname1 = newData.email.split('@')[0]
		const updInfo = {
			          email: newData.email,
                nickname: nickname1,
                given_name: newData.given_name,
                picture: newData.picture,
                role: Number(newData.role),
                country: newData.country,
                enable: Boolean(newData.enable)
		      }
		const holderUpdated = await holder.update(updInfo)
		return holderUpdated;
    }catch(error){
    	throw error;
    }
}
