import { Schema, model } from "mongoose";
import { UserStructure } from "../Interfaces/Interfaces";

const UserSchema = new Schema<UserStructure>({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    contactNumber: {
        type: String,
        match: [/^\d{10}$/, 'Please enter a valid 10 digit phone number'],
        default: '1234567890'
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other', 'prefer not to say'],
        default: 'prefer not to say'
    },
    language: {
        type: String,
        default: 'English',
        enum: ['English', 'Hindi', 'Gujarati', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Korean']
    },
    dateOfBirth: {
        type: Date,
        validate: {
            validator: function(date: Date) {
                return date <= new Date();
            },
            message: 'Date of birth cannot be in the future'
        },
        default: Date.now()
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationCode: String,
    verificationCodeExpiresAt: Date,
}, {timestamps: true});

const user = model<UserStructure>("User", UserSchema);
export default user;

