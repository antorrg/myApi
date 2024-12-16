import eh from '../../utils/errors/index.js'
import {createController, createItemController} from './createController.js'
import {delHomeController, delItemController} from './delController.js'
import {updController, detailUpdController} from './updController.js'
import {getPageHand, getPageById, getItemById} from './getPageController.js'
import postContact from './postContact.js'

export default {
    
    createController : eh.catchAsync(createController),
    createItemController : eh.catchAsync(createItemController),
    delHomeController : eh.catchAsync(delHomeController),
    delItemController : eh.catchAsync(delItemController),
    updController : eh.catchAsync(updController),
    detailUpdController : eh.catchAsync(detailUpdController),
    getPageHand : eh.catchAsync(getPageHand), 
    getPageById : eh.catchAsync(getPageById),
    getItemById : eh.catchAsync(getItemById),
    
    postContact,

};