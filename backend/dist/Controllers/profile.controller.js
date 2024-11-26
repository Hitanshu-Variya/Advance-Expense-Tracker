"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.getProfile = void 0;
const user_model_1 = __importDefault(require("../Models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req;
        const User = yield user_model_1.default.findById(userID);
        if (!User) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json({
            name: User.username,
            email: User.email,
            contactNumber: User.contactNumber,
            gender: User.gender,
            language: User.language,
            dateOfBirth: User.dateOfBirth
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching profile', error });
    }
});
exports.getProfile = getProfile;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req;
        const { username, password, contactNumber, gender, language, dateOfBirth } = req.body;
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        const updatedUser = yield user_model_1.default.findByIdAndUpdate(userID, {
            username,
            password: hashedPassword,
            contactNumber,
            gender,
            language,
            dateOfBirth
        });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            message: 'Profile updated successfully',
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating profile', error });
    }
});
exports.updateProfile = updateProfile;
