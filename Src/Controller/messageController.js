import messageModel from "../../DB/Models/messageModel.js";
import userModel from "../../DB/Models/userModel.js";
export const sendMessage = async(req, res, next) => {
    const { receiverId } = req.params;
    const { message } = req.body;
    const user = await userModel.findById(receiverId);
    if (!user) {
        return res.status(404).json({ message: "user not found!" });
    }
    const createMessage = await messageModel.create({ message, receiverId });
    return res.status(201).json({ message: "success" });
};
export const getMessages = async(req, res) => {
    const messagesList = await messageModel.find({ receiverId: req.user._id });
    return res.json({ message: "messages: ", messagesList });
}