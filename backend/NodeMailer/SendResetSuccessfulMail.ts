import { UserStructure } from "../Interfaces/Interfaces";
import nodemailer from 'nodemailer';
import { PasswordResetSuccessTemplate } from "./EmailTemplates";
import path from "path";

const SendResetSuccessfulMail = async (username: UserStructure["username"], email: UserStructure["email"]) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const LogoPath = path.join(__dirname, '../Images/Logo.png');
        const PasswordResetSuccessTemplatePath = path.join(__dirname, '../Images/PasswordResetSuccessTemplate.png');

        const mailDetails = {
            to: email,
            subject: 'Password Reset status',
            html: PasswordResetSuccessTemplate.replace("{Username}", username ?? "Error getting Username!"),
            attachments: [{
                filename: 'Logo.png',
                path: LogoPath,
                cid: '../Images/Logo.png' 
            }, {
                filename: 'PasswordResetSuccessTemplate.png',
                path: PasswordResetSuccessTemplatePath,
                cid: '../Images/PasswordResetSuccessTemplate.png' 
            }]
        };

        await transporter.sendMail(mailDetails);
        console.log(`Password Reset successful for ${email}`);

    } catch (error) {
        console.error(`Error resetting password: ${error}`);
        throw new Error('Error resetting password');
    }
};

export default SendResetSuccessfulMail;