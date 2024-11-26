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
exports.checkAuth = exports.logout = exports.login = exports.resetPassword = exports.forgetPassword = exports.verifyEmail = exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = __importDefault(require("crypto"));
const user_model_1 = __importDefault(require("../Models/user.model"));
const Interfaces_1 = require("../Interfaces/Interfaces");
const budget_model_1 = __importDefault(require("../Models/budget.model"));
const GenerateJWTTokenAndCookies_1 = __importDefault(require("../Utilities/GenerateJWTTokenAndCookies"));
const GenerateVerificationCode_1 = __importDefault(require("../Utilities/GenerateVerificationCode"));
const SendVerificationCode_1 = __importDefault(require("../NodeMailer/SendVerificationCode"));
const SendWelcomeMail_1 = __importDefault(require("../NodeMailer/SendWelcomeMail"));
const SendPasswordResetEmail_1 = __importDefault(require("../NodeMailer/SendPasswordResetEmail"));
const SendResetSuccessfulMail_1 = __importDefault(require("../NodeMailer/SendResetSuccessfulMail"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, confirmPassword, email } = req.body;
        const EmailalreadyExists = yield user_model_1.default.findOne({ email });
        if (EmailalreadyExists) {
            return res.status(400).json({ error: "Email already Exists! Please choose a different Email!" });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match!" });
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        const verificationCode = (0, GenerateVerificationCode_1.default)();
        const newUser = new user_model_1.default({
            username,
            password: hashedPassword,
            email,
            verificationCode,
            verificationCodeExpiresAt: Date.now() + 15 * 60 * 1000
        });
        yield newUser.save();
        (0, GenerateJWTTokenAndCookies_1.default)(newUser._id, res);
        yield Promise.all(Interfaces_1.categories.map((category) => __awaiter(void 0, void 0, void 0, function* () {
            yield budget_model_1.default.create({
                userID: newUser._id,
                category,
                amount: 1000,
                period: 'week'
            });
        })));
        yield (0, SendVerificationCode_1.default)(newUser.username, newUser.email, verificationCode);
        res.status(201).json({
            message: "signup successful!"
        });
    }
    catch (error) {
        console.log("Error: signup", error);
        return res.status(500).json({ error: "Internal Server Error!" });
    }
});
exports.signup = signup;
const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ReceivedCode } = req.body;
        const User = yield user_model_1.default.findOne({
            verificationCode: ReceivedCode,
            verificationCodeExpiresAt: { $gt: Date.now() }
        });
        if (!User) {
            return res.status(400).json({ error: "Invalid or Expired verification code" });
        }
        User.isVerified = true;
        User.verificationCode = undefined;
        User.verificationCodeExpiresAt = undefined;
        yield User.save();
        yield (0, SendWelcomeMail_1.default)(User.email, User.username);
        return res.status(201).send({
            sucesss: true,
            message: "Email Verified Successfully",
            username: User.username,
            email: User.email
        });
    }
    catch (error) {
        console.log("Error: verify-email", error);
        return res.status(500).json({ error: "Internal Server Error!" });
    }
});
exports.verifyEmail = verifyEmail;
const forgetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const User = yield user_model_1.default.findOne({ email });
        if (!User) {
            return res.status(400).json({ error: "Invalid E-mail address" });
        }
        const resetToken = crypto_1.default.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000);
        User.resetPasswordToken = resetToken;
        User.resetPasswordExpiresAt = resetTokenExpiresAt;
        yield User.save();
        res.status(201).json({ success: true, message: "password reset link send successfully!" });
        yield (0, SendPasswordResetEmail_1.default)(User.username, User.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);
    }
    catch (error) {
        console.log("Error: forget-password", error);
        return res.status(500).json({ error: "Internal Server Error!" });
    }
});
exports.forgetPassword = forgetPassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.params;
        const { password } = req.body;
        const User = yield user_model_1.default.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() }
        });
        if (!User) {
            return res.status(400).json({ error: "Invalid or Expired Reset Token" });
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        User.password = hashedPassword;
        User.resetPasswordToken = undefined;
        User.resetPasswordExpiresAt = undefined;
        yield User.save();
        yield (0, SendResetSuccessfulMail_1.default)(User.username, User.email);
        return res.status(201).json({ success: true, message: "password reset successfully!" });
    }
    catch (error) {
        console.log("Error: reset-password", error);
        return res.status(500).json({ error: "Internal Server Error!" });
    }
});
exports.resetPassword = resetPassword;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { email, password } = req.body;
        const User = yield user_model_1.default.findOne({ email });
        const CheckPassword = yield bcryptjs_1.default.compare(password, (_a = User === null || User === void 0 ? void 0 : User.password) !== null && _a !== void 0 ? _a : "");
        if (!User || !CheckPassword) {
            console.log("Login Invalid Credentials Error");
            return res.status(400).json({ error: "Invalid Credentials" });
        }
        (0, GenerateJWTTokenAndCookies_1.default)(User._id, res);
        return res.status(201).send({
            ID: User._id,
            email: User.email
        });
    }
    catch (error) {
        console.log("Error: login", error);
        return res.status(500).json({ error: "Internal Server Error!" });
    }
});
exports.login = login;
const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        return res.status(201).json({ message: "Logged Out Successfully!" });
    }
    catch (error) {
        console.log("Error: logout", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.logout = logout;
const checkAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const User = yield user_model_1.default.findById(req.userID).select("-password");
        if (!User) {
            return res.status(400).json({ error: "User Not Found!" });
        }
        return res.status(201).json({ success: true, User });
    }
    catch (error) {
        console.log("Error: check Auth", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.checkAuth = checkAuth;
