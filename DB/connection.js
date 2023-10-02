import mongoose, { mongo } from "mongoose";
const connectDB = async(req, res)=>{
    await mongoose.connect(process.env.DB_LOCAL)
        .then(() => {
            console.log("DB connection established")
        })
        .catch((error) => {
            console.log(`error to connect DB : ${error}` )
        })
};
export default connectDB