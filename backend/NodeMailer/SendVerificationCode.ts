import { UserStructure } from "../Interfaces/Interfaces";
import nodemailer from 'nodemailer';

const SendVerificationCode = async (email: UserStructure["email"], verificationCode: UserStructure["verificationCode"]) => {
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
            subject: 'Your Verification Code',
            html: `<p>Your verification code is <strong>${verificationCode}</strong></p>`
        };

        await transporter.sendMail(mailDetails);
        console.log(`Verification email sent to ${email}`);

    } catch (error) {
        console.error(`Error sending verification email: ${error}`);
        throw new Error('Error sending verification email');
    }
};

export default SendVerificationCode;