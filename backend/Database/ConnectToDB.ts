import mongoose from "mongoose";

const ConnectToDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL as string);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

export default ConnectToDB;