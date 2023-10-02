import express from 'express';
const app = express();
import * as messageController from "../Controller/messageController.js";
import { auth } from '../Middleware/authMiddleware.js';
import { asyncHandler } from '../Middleware/errorHandling.js';

app.post("/:receiverId", asyncHandler(messageController.sendMessage));
app.get("/", auth, asyncHandler(messageController.getMessages));
export default app;