import sv from '../../controllers/holder/index.js'

const delUserCtr = async (req, res) => {
    const {id}= req.params;
    const response = await sv.userDel(id)
    res.status(200).json(response)
}

export default delUserCtr;