import err from '../../utils/errors/index.js'
import createUserCtr from './createUserCtr.js'
import delUserCtr from './delUserCtr.js'
import loginUserCtr from './loginUserCtr.js'
import updUserCtr from './updUserCtr.js'
import {getUserCtr} from './getUserCtr.js'

export default {
    createUserCtr:  err.catchAsync(createUserCtr),
    delUserCtr:     err.catchAsync(delUserCtr),
    loginUserCtr:   err.catchAsync(loginUserCtr),
    updUserCtr:     err.catchAsync(updUserCtr),
    getUserCtr:     err.catchAsync(getUserCtr)
}