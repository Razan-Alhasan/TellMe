import userModel from "../../DB/Models/userModel.js";
export const userProfile = async(req, res, next) => {
    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.json({message:"user not found!"});
    }
    return res.json({message:"success", user: user});
};
