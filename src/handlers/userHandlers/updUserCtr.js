import sv from '../../controllers/holder/index.js'

const updUserCtr = async (req, res) => {
    const {id}= req.params;
    const newData = req.body;
    const response = await sv.userUpd(id, newData)
    res.status(200).json(response)
}




export default updUserCtr