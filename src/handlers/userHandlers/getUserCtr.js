import sv from "../../controllers/holder/index.js";

export const getUserCtr = async (req, res) => {
  const response = await sv.getAllUsers();
  res.status(200).json(response);
};
