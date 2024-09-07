import { UserStructure } from "../Interfaces/Interfaces";
import nodemailer from 'nodemailer';

const SendResetSuccessfulMail = async (email: UserStructure["email"]) => {
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
            subject: 'Password Reset status',
            html: `<p> Your Password Reset Successfully! </p>`
        };

        await transporter.sendMail(mailDetails);
        console.log(`Password Reset successful for ${email}`);

    } catch (error) {
        console.error(`Error resetting password: ${error}`);
        throw new Error('Error resetting password');
    }
};

export default SendResetSuccessfulMail;