"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    var _a;
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(400).json({ error: "Unauthorized - No token Provided!" });
        }
        const decode = jsonwebtoken_1.default.verify(token, (_a = process.env.SECRET_JWT_KEY) !== null && _a !== void 0 ? _a : "");
        if (!decode) {
            return res.status(400).json({ error: "Unauthorized - Invalid Provided!" });
        }
        req.userID = decode.userID;
        next();
    }
    catch (error) {
        console.log("Error: signup", error);
        return res.status(500).json({ error: "Internal Server Error!" });
    }
};
exports.default = verifyToken;
