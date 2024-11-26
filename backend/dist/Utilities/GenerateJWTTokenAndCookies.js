"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const GenerateJWTTokenAndCookie = (userID, res) => {
    const key = process.env.SECRET_JWT_KEY;
    if (!key) {
        throw new Error("JWT Key not found!");
    }
    const token = jsonwebtoken_1.default.sign({ userID }, key, { expiresIn: "10d" });
    res.cookie("jwt", token, {
        maxAge: 10 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'none',
        secure: true
    });
};
exports.default = GenerateJWTTokenAndCookie;
