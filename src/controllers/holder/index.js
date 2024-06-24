import userCreate from './userCreate.js'
import userDel from './userDel.js'
import {getAllUsers, getUsersById} from './userGet.js'
import userLog from './userLog.js'
import userUpd from './userUpd.js'
import {verifyPass, userChangePass} from './userChangePass.js'

export default {
    userCreate,
    userDel,
    getAllUsers,
    getUsersById,
    userLog,
    userUpd,
    verifyPass,
    userChangePass
};