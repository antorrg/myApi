import eh from "../../utils/errors/index.js";
import sv from "../../controllers/holder/userServices.js";

export default {
  createUserCtr: eh.catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const response = await sv.userCreate(email, password);
    res.status(201).json(response);
  }),
  loginUserCtr: eh.catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const response = await sv.userLog(email, password);
    res.status(200).json(response);
  }),
  getUserCtr: eh.catchAsync(async (req, res) => {
    const response = await sv.getAllUsers();
    res.status(200).json(response);
  }),

  getDetailCtr: eh.catchAsync(async (req, res) => {
    const { id } = req.params;
    const response = await sv.getUsersById(id);
    res.status(200).json(response);
  }),
  updUserCtr: eh.catchAsync(async (req, res) => {
    const { id } = req.params;
    const newData = req.body;
    const response = await sv.userUpd(id, newData);
    res.status(200).json(response);
  }),

  verifyPassCtr: eh.catchAsync(async (req, res) => {
    const { id, password } = req.body;
    const response = await sv.verifyPass(id, password);
    res.status(200).json(response);
  }),

  changePassCtr: eh.catchAsync(async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;
    const response = await sv.userChangePass(id, password);
    res.status(200).json(response);
  }),
  delUserCtr: eh.catchAsync(async (req, res) => {
    const { id } = req.params;
    const response = await sv.userDel(id);
    res.status(200).json(response);
  }),
};
