import { UserStructure } from "../Interfaces/Interfaces";
import { VerificationCodeTemplate } from "./EmailTemplates";
import nodemailer from 'nodemailer';
import path from 'path';

const SendVerificationCode = async (username: UserStructure["username"], email: UserStructure["email"], verificationCode: UserStructure["verificationCode"]) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            secure: process.env.EMAIL_PORT === "465",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const LogoPath = path.join(__dirname, '../Images/Logo.png');
        const VerificationCodeTemplatePath = path.join(__dirname, '../Images/VerificationCodeTemplate.png');
        
        const mailDetails = {
            to: email,
            subject: 'Your Verification Code',
            html: VerificationCodeTemplate.replace("{Verification Code}", verificationCode ?? "Internal Error!").replace("{Username}", username ?? "Error getting Username!"),
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

        await transporter.sendMail(mailDetails);
        console.log(`Verification email sent to ${email}`);

    } catch (error) {
        console.error(`Error sending verification email: ${error}`);
        throw new Error('Error sending verification email');
    }
};

export default SendVerificationCode;
