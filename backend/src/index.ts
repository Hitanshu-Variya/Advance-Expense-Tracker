import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from "../Routes/auth.routes";
import transactionRoutes from "../Routes/transaction.routes";
import budgetRoutes from "../Routes/budget.routes";
import ConnectToDB from "../Database/ConnectToDB";
import cookieParser from 'cookie-parser';
import profileRoutes from "../Routes/profile.routes";
import path from 'path';

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

const allowedOrigins = process.env.CLIENT_URL ? [process.env.CLIENT_URL] : []; 
console.log(allowedOrigins);

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,      
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
};

app.use(cors(corsOptions));  

app.use(express.json());
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/public/images', express.static(path.join(__dirname, 'public/images')));

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
