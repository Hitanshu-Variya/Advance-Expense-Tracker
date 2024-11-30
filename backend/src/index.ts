import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from "../Routes/auth.routes";
import transactionRoutes from "../Routes/transaction.routes";
import budgetRoutes from "../Routes/budget.routes";
import ConnectToDB from "../Database/ConnectToDB";
import cookieParser from 'cookie-parser';
import profileRoutes from "../Routes/profile.routes";

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
const allowedOrigins = [process.env.CLIENT_URL];

app.use(cors({
    origin: function(origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200,
    preflightContinue: false,
    maxAge: 86400 // 24 hours
}));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send("Backend Working!");
});
app.use("/api/auth", authRoutes);
app.use("/data", transactionRoutes);
app.use('/budget', budgetRoutes);
app.use('/profile', profileRoutes);

app.listen(PORT, () => {
    ConnectToDB();
    console.log(`The Server is Running on Port: ${PORT}`);
});
