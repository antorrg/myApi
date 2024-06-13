import eh from '../../utils/errors/index.js'
import createController from './createController.js'
import delController from './delController.js'
import {updController, detailUpdController} from './updController.js'
import {getHome, getDetailById, getDetailImage} from './getControllers.js'
import {getPageHand, getPageById } from './getPageController.js'

export default {
    
    createController : eh.catchAsync(createController),
    delController : eh.catchAsync(delController),
    updController : eh.catchAsync(updController),
    detailUpdController: eh.catchAsync(detailUpdController),
    getHome : eh.catchAsyncMVC(getHome),
    getDetailById : eh.catchAsyncMVC(getDetailById),
    getDetailImage: eh.catchAsyncMVC(getDetailImage),
    getPageHand : eh.catchAsync(getPageHand), 
    getPageById : eh.catchAsync(getPageById),
};