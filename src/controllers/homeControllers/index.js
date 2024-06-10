import eh from '../../utils/errors/index.js'
import createController from './createController.js'
import delController from './delController.js'
import updController from './updController.js'
import {getHome, getDetailById, getDetailImage} from './getControllers.js'

export default {
    createController : eh.catchAsync(createController),
    delController : eh.catchAsync(delController),
    updController : eh.catchAsync(updController),
    getHome : eh.catchAsync(getHome),
    getDetailById : eh.catchAsync(getDetailById),
    getDetailImage: eh.catchAsync(getDetailImage),

}