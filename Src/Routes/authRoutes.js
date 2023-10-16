import express from "express";
import * as authController from "../Controllers/authController.js";
const app = express();
import { asyncHandler } from "../Middleware/errorHandling.js";
import validation from "../Validation/validation.js";
import * as validators from "../Validation/authValidation.js"
import { signinSchema, signupSchema } from "../Validation/authValidation.js";
app.post("/signup", validation(validators.signupSchema), asyncHandler(authController.signup)
);
app.post("/signin", validation(validators.signinSchema), asyncHandler(authController.signin)
);
app.put("/confirmEmail/:token", asyncHandler(authController.confirmEmail));
app.put("/newConfirmEmail/:RefreshToken", asyncHandler(authController.newConfirmEmail)
);
export default app;
