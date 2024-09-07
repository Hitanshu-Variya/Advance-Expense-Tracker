import { Types } from 'mongoose';

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

export { UserStructure };