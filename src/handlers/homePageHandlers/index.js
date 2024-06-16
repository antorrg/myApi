import eh from '../../utils/errors/index.js'
import {createController, createItemController} from './createController.js'
import delController from './delController.js'
import {updController, detailUpdController} from './updController.js'
import {getHome, getDetailById, getDetailImage, getContact } from './getControllers.js'
import {getPageHand, getPageById, getItemById} from './getPageController.js'

export default {
    
    createController : eh.catchAsync(createController),
    createItemController : eh.catchAsync(createItemController),
    delController : eh.catchAsync(delController),
    updController : eh.catchAsync(updController),
    detailUpdController: eh.catchAsync(detailUpdController),
    getHome : eh.catchAsyncMVC(getHome),
    getDetailById : eh.catchAsyncMVC(getDetailById),
    getDetailImage: eh.catchAsyncMVC(getDetailImage),
    getContact : eh.catchAsyncMVC(getContact),
    getPageHand : eh.catchAsync(getPageHand), 
    getPageById : eh.catchAsync(getPageById),
    getItemById : eh.catchAsync(getItemById)
};