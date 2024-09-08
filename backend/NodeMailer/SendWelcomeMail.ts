import { UserStructure } from "../Interfaces/Interfaces";
import { WelcomeEmailTemplate } from "./EmailTemplates";
import nodemailer from 'nodemailer';
import path from "path";

const SendWelcomeMail = async (email: UserStructure["email"], username: UserStructure["username"]) => {
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
        const WelcomeEmailTemplatePath = path.join(__dirname, '../Utilities/Images/WelcomeTemplate.png');
        
        const mailDetails = {
            to: email,
            subject: 'Welcome To Expense Flow',
            html: WelcomeEmailTemplate.replace("{Username}", username ?? "Error getting Username!"),
            attachments: [{
                filename: 'Logo.png',
                path: LogoPath,
                cid: '../Utilities/Images/Logo.png' 
            }, {
                filename: 'WelcomeTemplate.png',
                path: WelcomeEmailTemplatePath,
                cid: '../Utilities/Images/WelcomeTemplate.png' 
            }]
        };

        await transporter.sendMail(mailDetails);
        console.log(`${email} verifed successfully!`);

    } catch (error) {
        console.error(`Error sending welcome email: ${error}`);
        throw new Error('Error sending welcome email');
    }
};

export default SendWelcomeMail;