import joi from "joi";
import { generalFields } from "./validation.js";
export const profile = {
  body: joi.object({
    file: generalFields.file.required(),
  }),
};
export const updatePass = {
  body: joi.object({
    oldPass: generalFields.password,
    newPass: generalFields.password.invalid(joi.ref("oldPass")).messages({
      "any.invalid": "you must type a new pass!"
    }),
    cPass: joi.string().valid(joi.ref("newPass")).required(),
  }),
};
export const shareProfile = {
  params: joi.object({
    id: generalFields.id
  })
};
