import userModel from "../../DB/Models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { signupSchema, signinSchema } from "../Validation/authValidation.js";
import sendEmail from "../Services/sendEmail.js";
export const signup = async (req, res, next) => {
    const validationResult = signupSchema.validate(req.body, {
        abortEarly: false,
    });
    if (validationResult.error) {
        return res.status(400).json(validationResult.error.details);
    }
    const { userName, email, password, gender } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
        //return res.status(409).json({ message: "Email exist !, please use another email.." });
        return next(new Error("Email exist !, please use another email.."));
    }
    const hashedPassword = bcrypt.hashSync(
        password,
        parseInt(process.env.SALTROUND)
    );
    const createUser = await userModel.create({
        userName,
        email,
        password: hashedPassword,
        gender,
    });
    const token = jwt.sign({ email }, process.env.EMAILTOKEN, { expiresIn: "1h" });
    const RefreshToken = jwt.sign({ email }, process.env.EMAILTOKEN, { expiresIn: 60 * 60 * 24 });
    const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`;
    const refreshLink = `${req.protocol}://${req.headers.host}/auth/newConfirmEmail/${RefreshToken}`;
    const html = `<a href=${link}>Confirm Email </a> </br> </br> <a href=${refreshLink}>request new Email </a>`;
    sendEmail(email, "confirm email", html);
    return res.status(201).json({ message: "success", user: createUser._id });
};
export const signin = async (req, res, next) => {
    const validationResult = signinSchema.validate(req.body, {
        abortEarly: false,
    });
    if (validationResult.error) {
        return res.status(400).json(validationResult.error.details);
    }
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
        // return res.status(404).json({ message: "user not found!, data invalid" });
                return next(new Error("user not found!, data invalid"));
    }
    if (!user.confirmEmail) {
        // return res.status(400).json({ message: "please confirm your email first.." });
            return next(new Error("please confirm your email first.."));

    }
    const match = bcrypt.compareSync(password, user.password);
    if (!match) {
        // return res.status(404).json({ message: "data invalid" });
                return next(new Error("data invalid"));

    }
    const token = jwt.sign({ id: user._id }, process.env.LOGINTOKEN, {
        expiresIn: "1h",
    });
    return res.status(200).json({ message: "success", token });
};
export const confirmEmail = async (req, res, next) => {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.EMAILTOKEN);
    const user = await userModel.findOneAndUpdate(
        { email: decoded.email, confirmEmail: false },
        { confirmEmail: true }
    );
    if (!user) {
        // return res.status(400).json({ message: "your email is verified" });
        return next(new Error("your email is verified"));
    }
    if (user) {
        return res.json({ message: "your email is confirmed, plz log in.." });
    }
};
export const newConfirmEmail = async (req, res, next) => {
    const { RefreshToken } = req.params;
    const decoded = jwt.verify(RefreshToken, process.env.EMAILTOKEN);
    const token = jwt.sign({ email: decoded.email }, process.env.EMAILTOKEN);
    const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`;
    const html = `<a href=${link}>Confirm Email </a> `;
    sendEmail(decoded.email, "confirm email", html);
    return res
        .status(201)
        .json({ message: "new email is sent successfully ..." });
};
