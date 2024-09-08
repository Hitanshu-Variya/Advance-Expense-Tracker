import { UserStructure } from '../Interfaces/Interfaces';
import nodemailer from 'nodemailer';
import { ResetPasswordEmailTemplate } from './EmailTemplates';
import path from 'path';

const SendPasswordResetEmail = async (username: UserStructure["username"], email: UserStructure["email"], clientURL: string) => {
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

        const LogoPath = path.join(__dirname, '../Utilities/Images/Logo.png');
        const ResetPasswordEmailTemplatePath = path.join(__dirname, '../Utilities/Images/ResetPasswordTemplate.png');

        const mailDetails = {
            to: email,
            subject: 'Password Reset Link',
            html: ResetPasswordEmailTemplate.replace("{Username}", username ?? "Error getting Username!").replace("{ResetLink}", clientURL),
            attachments: [{
                filename: 'Logo.png',
                path: LogoPath,
                cid: '../Utilities/Images/Logo.png' 
            }, {
                filename: 'ResetPasswordTemplate.png',
                path: ResetPasswordEmailTemplatePath,
                cid: '../Utilities/Images/ResetPasswordTemplate.png' 
            }]
        };

        await transporter.sendMail(mailDetails);
        console.log(`Password Reset Link sent to ${email}`);

    } catch (error) {
        console.error(`Error sending Password Reset Link: ${error}`);
        throw new Error('Error sending Password Reset Link');
    }
};

export default SendPasswordResetEmail;