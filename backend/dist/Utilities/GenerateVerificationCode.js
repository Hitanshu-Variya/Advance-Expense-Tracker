"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GenerateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};
exports.default = GenerateVerificationCode;
