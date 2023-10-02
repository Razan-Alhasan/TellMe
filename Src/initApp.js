import messageRoutes from "./Routes/messageRoutes.js";
import authRoutes from "./Routes/authRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import connectDB from "../DB/connection.js";
import cors from "cors";
const initApp = (app, express) => {
    connectDB();
    app.use(cors());
    app.use(express.json());
    app.use('/message', messageRoutes);
    app.use('/auth', authRoutes);
    app.use('/user', userRoutes);
    app.use('*', (req, res) => {
        return res.json({message: "PAGE NOT FOUND"});
    });
};
export default initApp;