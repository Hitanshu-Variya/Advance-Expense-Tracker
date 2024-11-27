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
    console.log("Incoming Origin:", req.headers.origin); 
    next();
});

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
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
