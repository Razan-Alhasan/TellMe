import mongoose from "mongoose";
import { Schema, model } from "mongoose";
const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmEmail: {
        type: Boolean,
        default: false
    },
    gender: {
        type: String,
        default: "Male",
        enum: ["Male", "Female"]
    }
}, {
    timestamps: true,
});
const userModel = mongoose.models.User || model("User", userSchema);
export default userModel;