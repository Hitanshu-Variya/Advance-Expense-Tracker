import express from 'express';
import dotenv from 'dotenv';
import authRoutes from "../Routes/auth.routes.ts";
import ConnectToDB from "../Database/ConnectToDB.ts"
import cookieParser from 'cookie-parser';

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    ConnectToDB();
    console.log(`The Server is Running on Port: ${PORT}`);
});