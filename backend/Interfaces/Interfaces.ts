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

interface Budget {
    _id?: Types.ObjectId,
    userID: ObjectId,
    category: string;
    amount: number;
    period: 'week' | 'month' | 'year';
}

declare global {
    namespace Express {
        export interface Request {
            userID?: string;
        }
    }
}

export type Category = 'Food' | 'Transport' | 'Health' | 'Education' | 'Entertainment' | 'Shopping' | 'Utilities' | 'Others';

export const categories: Category[] = [
  'Food', 'Transport', 'Health', 'Education', 'Entertainment', 'Shopping', 'Utilities', 'Others'
];

export { UserStructure, TransactionStructure, Budget };