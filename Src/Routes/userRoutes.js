import express from "express";
import {asyncHandler} from "../Middleware/errorHandling.js"
const app = express();
import * as userController from "../Controllers/userController.js";
import { auth } from "../Middleware/authMiddleware.js";
import fileUpload, { fileValidation } from "../Services/multer.js";
import * as validators from "../Validation/userValidation.js"
import validation from "../Validation/validation.js";

app.get("/profile", fileUpload(fileValidation.image).single('profilePic') , auth,validation(validators.profile), asyncHandler(userController.userProfile));
app.patch("/updatePass", auth, validation(validators.updatePass), asyncHandler(userController.updatePass))
app.get("/:id/profile", validation(validators.shareProfile), asyncHandler(userController.shareProfile))
export default app;