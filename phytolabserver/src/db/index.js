// Connects the server to the db (mongoDB using mongoose)
// important to have MONGODB_URI & DB_NAME in .env
import mongoose from "mongoose";
import env from "../constants.js";


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${env.MONGODB_URI}${env.DB_NAME}`)
        
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

export default connectDB;