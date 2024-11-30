"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EmailTemplates_1 = require("./EmailTemplates");
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
const SendVerificationCode = (username, email, verificationCode) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transporter = nodemailer_1.default.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            secure: process.env.EMAIL_PORT === "465",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        const LogoPath = path_1.default.join(__dirname, '../Images/Logo.png');
        const VerificationCodeTemplatePath = path_1.default.join(__dirname, '../Images/VerificationCodeTemplate.png');
        const mailDetails = {
            to: email,
            subject: 'Your Verification Code',
            html: EmailTemplates_1.VerificationCodeTemplate.replace("{Verification Code}", verificationCode !== null && verificationCode !== void 0 ? verificationCode : "Internal Error!").replace("{Username}", username !== null && username !== void 0 ? username : "Error getting Username!"),
            attachments: [{
                    filename: 'Logo.png',
                    path: LogoPath,
                    cid: '../Images/Logo.png'
                }, {
                    filename: 'VerificationCodeTemplate.png',
                    path: VerificationCodeTemplatePath,
                    cid: '../Images/VerificationCodeTemplate.png'
                }]
        };
        yield transporter.sendMail(mailDetails);
        console.log(`Verification email sent to ${email}`);
    }
    catch (error) {
        console.error(`Error sending verification email: ${error}`);
        throw new Error('Error sending verification email');
    }
});
exports.default = SendVerificationCode;
