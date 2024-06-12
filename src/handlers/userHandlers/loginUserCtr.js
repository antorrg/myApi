import sv from '../../controllers/holder/index.js'

const loginUserCtr = async (req, res) => {
   const {email, password}= req.body;
    const response = await sv.userLog(email, password)
    res.status(200).json(response)
}

export default loginUserCtr;