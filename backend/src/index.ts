import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from "../Routes/auth.routes";
import transactionRoutes from "../Routes/transaction.routes";
import budgetRoutes from "../Routes/budget.routes";
import ConnectToDB from "../Database/ConnectToDB"
import cookieParser from 'cookie-parser';
import profileRoutes from "../Routes/profile.routes";

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  credentials: true
}));
app.use((req, res, next) => {
    const allowedOrigin = process.env.CLIENT_URL; 
    res.header("Access-Control-Allow-Origin", allowedOrigin);
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS"); 
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); 
    res.header("Access-Control-Allow-Credentials", "true"); 

    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }
    next();
});

app.get('/', (req, res) => {
    res.send("Backend Working!")
})
app.use("/api/auth", authRoutes);
app.use("/data", transactionRoutes);
app.use('/budget', budgetRoutes);
app.use('/profile', profileRoutes);

app.listen(PORT, () => {
    ConnectToDB();
    console.log(`The Server is Running on Port: ${PORT}`);
});
