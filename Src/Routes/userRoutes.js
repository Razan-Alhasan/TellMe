import express from "express";
import {asyncHandler} from "../Middleware/errorHandling.js"
const app = express();
import * as userController from "../Controller/userController.js";
import { auth } from "../Middleware/authMiddleware.js";
app.get("/profile", auth, asyncHandler(userController.userProfile));
export default app;