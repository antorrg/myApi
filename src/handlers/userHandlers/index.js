import eh from '../../utils/errors/index.js'
import createUserCtr from './createUserCtr.js'
import delUserCtr from './delUserCtr.js'
import loginUserCtr from './loginUserCtr.js'
import updUserCtr from './updUserCtr.js'
import {getUserCtr, getDetailCtr} from './getUserCtr.js'

export default {
    createUserCtr:  eh.catchAsync(createUserCtr),
    delUserCtr:     eh.catchAsync(delUserCtr),
    loginUserCtr:   eh.catchAsync(loginUserCtr),
    updUserCtr:     eh.catchAsync(updUserCtr),
    getUserCtr:     eh.catchAsync(getUserCtr),
    getDetailCtr :  eh.catchAsync(getDetailCtr)
}