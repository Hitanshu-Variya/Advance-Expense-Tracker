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
const nodemailer_1 = __importDefault(require("nodemailer"));
const EmailTemplates_1 = require("./EmailTemplates");
const path_1 = __importDefault(require("path"));
const SendResetSuccessfulMail = (username, email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transporter = nodemailer_1.default.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        const LogoPath = path_1.default.join(__dirname, '/Images/Logo.png');
        const PasswordResetSuccessTemplatePath = path_1.default.join(__dirname, '/Images/PasswordResetSuccessTemplate.png');
        const mailDetails = {
            to: email,
            subject: 'Password Reset status',
            html: EmailTemplates_1.PasswordResetSuccessTemplate.replace("{Username}", username !== null && username !== void 0 ? username : "Error getting Username!"),
            attachments: [{
                    filename: 'Logo.png',
                    path: LogoPath,
                    cid: '/Images/Logo.png'
                }, {
                    filename: 'PasswordResetSuccessTemplate.png',
                    path: PasswordResetSuccessTemplatePath,
                    cid: '/Images/PasswordResetSuccessTemplate.png'
                }]
        };
        yield transporter.sendMail(mailDetails);
        console.log(`Password Reset successful for ${email}`);
    }
    catch (error) {
        console.error(`Error resetting password: ${error}`);
        throw new Error('Error resetting password');
    }
});
exports.default = SendResetSuccessfulMail;
