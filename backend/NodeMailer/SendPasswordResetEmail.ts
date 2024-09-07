import { UserStructure } from '../Interfaces/Interfaces';
import nodemailer from 'nodemailer';

const SendPasswordResetEmail = async (email: UserStructure["email"], clientURL: string) => {
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
            subject: 'Password Reset Link',
            html: `<p>Your Password Reset Link is : <a href=${clientURL}> click me! </a></p>`
        };

        await transporter.sendMail(mailDetails);
        console.log(`Password Reset Link sent to ${email}`);

    } catch (error) {
        console.error(`Error sending Password Reset Link: ${error}`);
        throw new Error('Error sending Password Reset Link');
    }
};

export default SendPasswordResetEmail;