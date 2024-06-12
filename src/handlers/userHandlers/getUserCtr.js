import sv from "../../controllers/holder/index.js";

export const getUserCtr = async (req, res) => {
  const response = await sv.getAllUsers();
  res.status(200).json(response);
};

export const getDetailCtr = async (req, res) => {
  const {id}= req.params
  const response = await sv.getUsersById(id)
  res.status(200).json(response);
}