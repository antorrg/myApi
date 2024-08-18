import sv from '../../controllers/holder/index.js'
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
         res.render('./protectRoutes/page', {info, page})
  }),
  detailItem : eh.catchAsyncMVC(async(req, res)=>{
    const {userId}=req.session.user
    const {id}=req.params;
    const info = await sv.getUsersById(userId)
    const item = await spage.getDetail(id)
    res.render('./protectRoutes/item', {info, item})
  }),
  updFormItem : eh.catchAsyncMVC(async(req, res)=>{
    const {userId}=req.session.user
    const {id}=req.params;
    const info = await sv.getUsersById(userId)
    const item = await spage.getDetail(id)
    res.render('./protectRoutes/updateItem', {info, item})
  }),
  allUsers : eh.catchAsyncMVC(async(req, res)=>{
    const {userId}=req.session.user
    const info = await sv.getUsersById(userId)
    const users = await sv.getAllUsers()
    res.render('./protectRoutes/users', {info, users})
  })

}