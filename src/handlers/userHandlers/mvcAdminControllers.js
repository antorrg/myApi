import sv from '../../controllers/holder/userServices.js'
import spage from '../../controllers/homePageServ/index.js'
import eh from '../../utils/errors/index.js'

export default {
   detailPages: eh.catchAsyncMVC(async(req, res)=>{
        const {userId}=req.session.user
        const {id}= req.params;
        //console.log('Id page: ',id)
         const info = await sv.getUsersById(userId)
         const page = await spage.getById(id)
         //console.log('page content: ',page)
         res.render('./protectRoutes/pages/page', {info, page})
  }),
  updFormPage : eh.catchAsyncMVC(async(req, res)=>{
    const {userId}=req.session.user
    const {id}=req.params;
    const info = await sv.getUsersById(userId)
    const page = await spage.getById(id)
    res.render('./protectRoutes/pages/updatePage', {info, page})
  }),
  detailItem : eh.catchAsyncMVC(async(req, res)=>{
    const {userId}=req.session.user
    const {id}=req.params;
    const info = await sv.getUsersById(userId)
    const item = await spage.getDetail(id)
    res.render('./protectRoutes/pages/item', {info, item})
  }),
  updFormItem : eh.catchAsyncMVC(async(req, res)=>{
    const {userId}=req.session.user
    const {id}=req.params;
    const info = await sv.getUsersById(userId)
    const item = await spage.getDetail(id)
    res.render('./protectRoutes/pages/updateItem', {info, item})
  }),
  createFormItem : eh.catchAsyncMVC(async(req, res)=>{
    const {userId}=req.session.user
    const {id}=req.params;
    const info = await sv.getUsersById(userId)
    const pageId = id;
    res.render('./protectRoutes/pages/createItem', {info, pageId})
  }),
  allUsers : eh.catchAsyncMVC(async(req, res)=>{
    const {userId}=req.session.user
    const info = await sv.getUsersById(userId)
    const users = await sv.getAllUsers()
    res.render('./protectRoutes/users/users', {info, users})
  })

}