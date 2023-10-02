import joi from "joi";
export const signupSchema = joi.object({
  userName: joi.string().alphanum().required(),
  email: joi.string().email().required().messages({
    "string.empty": "email is required!",
    "string.email": "please enter a valid email",
  }),
    gender: joi.string().valid("Male", "Female"),
  password: joi.string().required().min(3).messages({
    "string.empty": "password is required!",
  }),
  cPassword: joi.string().valid(joi.ref("password")).required().messages({
    "string.empty": "confirm password is required!",
  }),
});
export const signinSchema = joi.object({
  email: joi.string().required().messages({
    "string.empty": "email is required!",
    "string.email": "please enter a valid email",
  }),
  password: joi.string().min(3).required().messages({
    "string.empty": "password is required!",
  }),
});
