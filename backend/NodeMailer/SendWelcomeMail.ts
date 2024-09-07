import { UserStructure } from "../Interfaces/Interfaces";
import nodemailer from 'nodemailer';

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

        const mailDetails = {
            to: email,
            subject: 'Your welcome Page',
            html: `<p>welcome to expense tracker app : <strong>${username}</strong></p>`
        };

        await transporter.sendMail(mailDetails);
        console.log(`${email} verifed successfully!`);

    } catch (error) {
        console.error(`Error sending welcome email: ${error}`);
        throw new Error('Error sending welcome email');
    }
};

export default SendWelcomeMail;