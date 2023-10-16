import joi from "joi";
import { Types } from "mongoose";
const dataMethods = ["body", "query", "params", "headers"];
const validationObjectId = (value, helper) => {
  if (Types.ObjectId.isValid(value)) {
    return true;
  }
  return helper.message();
}
export const generalFields = {
  email: joi.string().email().required().min(5).messages({
    "string.empty": "email is required!",
    "string.email": "please enter a valid email",
  }),
  password: joi.string().required().min(3).messages({
    "string.empty": "password is required!",
  }),
  file: joi.object({
      size: joi.number().positive().required(),
      pathL: joi.string().required(),
      filenameL: joi.string().required(),
      destinationL: joi.string().required(),
      mimetypeL: joi.string().required(),
      oncodingL: joi.string().required(),
      originalnameL: joi.string().required(),
      filenameL: joi.string().required(),
      dest: joi.string(),
  }),
  id: joi.string().custom(validationObjectId).required()
};
const validation = (schema) => {
  return (req, res, next) => {
    const validationArray = [];
    dataMethods.forEach((key) => {
      if (schema[key]) {
        const validationResult = schema[key].validate(req[key], {
          abortEarly: false,
        });
        if (validationResult.error) {
          validationArray.push(validationResult.error.details);
        }
      }
    });

    if (validationArray.length > 0) {
      return res
        .status(400)
        .json({ message: "Validation error", validationArray });
    } else {
      return next();
    }
  };
};
export default validation;
