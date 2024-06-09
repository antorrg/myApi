import sv from '../../services/user/index.js'

export const getUserCtr = async (req, res) => {
    const response = await sv.getAllUsers()
    res.status(200).json(response)
}