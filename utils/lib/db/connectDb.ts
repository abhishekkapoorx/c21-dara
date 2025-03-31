import mongoose from "mongoose";

export const connect = async () => {
    try {
        const MONGODB_URI = <string>process.env.MONGODB_URI;
        const connection = await mongoose.connect(MONGODB_URI);

        console.log(`Connected to MongoDB: ${connection.connection.host}`);

        return connection;
        
    } catch (error) {
        throw new Error()
    }
}