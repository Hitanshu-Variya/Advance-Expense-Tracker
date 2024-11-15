import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from "../Routes/auth.routes.ts";
import transactionRoutes from "../Routes/transaction.routes.ts";
import budgetRoutes from "../Routes/budget.routes.ts";
import ConnectToDB from "../Database/ConnectToDB.ts"
import cookieParser from 'cookie-parser';

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use((_, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.use("/api/auth", authRoutes);
app.use("/data", transactionRoutes);
app.use('/budget', budgetRoutes);

app.listen(PORT, () => {
    ConnectToDB();
    console.log(`The Server is Running on Port: ${PORT}`);
});