import { Request } from 'express';
import { ObjectId, Types } from 'mongoose';

interface UserStructure {
    _id?: Types.ObjectId,
    username: string,
    password: string,
    email: string,
    lastLogin: Date,
    isVerified: boolean,
    resetPasswordToken: string | undefined,
    resetPasswordExpiresAt: Date | undefined,
    verificationCode: string | undefined,
    verificationCodeExpiresAt: Date | undefined,
};

interface TransactionStructure {
    _id?: Types.ObjectId,
    createdBy: ObjectId,
    transactionName: string,
    amount: number,
    category: string,
    description: string | null,
    paymentMethod: string,
    date: Date,
    transactionType: string
};

declare global {
    namespace Express {
        export interface Request {
            userID?: string;
        }
    }
}

export { UserStructure, TransactionStructure };