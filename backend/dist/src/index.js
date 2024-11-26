"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("../Routes/auth.routes"));
const transaction_routes_1 = __importDefault(require("../Routes/transaction.routes"));
const budget_routes_1 = __importDefault(require("../Routes/budget.routes"));
const ConnectToDB_1 = __importDefault(require("../Database/ConnectToDB"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const profile_routes_1 = __importDefault(require("../Routes/profile.routes"));
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL,
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    credentials: true
}));
app.use((_, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
app.get('/', (req, res) => {
    res.send("Backend Working!");
});
app.use("/api/auth", auth_routes_1.default);
app.use("/data", transaction_routes_1.default);
app.use('/budget', budget_routes_1.default);
app.use('/profile', profile_routes_1.default);
app.listen(PORT, () => {
    (0, ConnectToDB_1.default)();
    console.log(`The Server is Running on Port: ${PORT}`);
});
