"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
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
            validator: function (date) {
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
}, { timestamps: true });
const user = (0, mongoose_1.model)("User", UserSchema);
exports.default = user;
