import sv from '../../controllers/holder/index.js'

export const verifyPassCtr = async (req, res) => {
    const {id, password}= req.body;
    const response = await sv.verifyPass(id, password)
    res.status(200).json(response)
}


export const changePassCtr = async (req, res) => {
    const {id}= req.params;
    const {password}= req.body;
    const response = await sv.userChangePass(id, password)
    res.status(200).json(response)
}







