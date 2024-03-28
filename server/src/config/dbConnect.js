import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URL);
        if(conn) return conn;
        return null;
    } catch(error) {
        throw new Error(error.message);
    }
}

export default dbConnect;