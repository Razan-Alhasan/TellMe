import bcrypt from "bcryptjs";
import userModel from "../../DB/Models/userModel.js";
import cloudinary from "../Services/cloudinary.js";
export const userProfile = async (req, res, next) => {
  if (!req.file) {
    return next(new Error("please provide a file"));
  }
  const { secure_url } = await cloudinary.uploader.upload(req.file.path, {
    folder: `${process.env.APP_NAME}/user/${req.user._id}/profile`,
  });
  const user = await userModel.findByIdAndUpdate(
    req.user._id,
    { profilePic: secure_url },
    { new: true }
  );
  return res.json({ message: user });
};
export const updatePass = async (req, res, next) => {
  const { oldPass, newPass, cPass } = req.body;
  const user = await userModel.findById(req.user._id);
  const match = bcrypt.compareSync(oldPass, user.password);
  if (!match) {
    return next(new Error("invald old password!"));
  }
  const hachPass = bcrypt.hashSync(newPass, parseInt(process.env.SALTROUND));
  user.password = hachPass;
  user.save();
  return res.json({message: "sucess, password was updated succesfully"});
};
export const shareProfile = async (req, res, next) => {
  const user = await userModel.findById(req.params.id).select('userName email');
  if (!user) {
    return next(new Error("User not found"));
  }
  return res.json({ message: "success", user });
};
