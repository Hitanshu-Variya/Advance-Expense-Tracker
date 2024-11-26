import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import user from "../Models/user.model";
import { categories } from '../Interfaces/Interfaces';
import BudgetModel from "../Models/budget.model";
import GenerateJWTTokenAndCookie from '../Utilities/GenerateJWTTokenAndCookies';
import GenerateVerificationCode from '../Utilities/GenerateVerificationCode';
import SendVerificationCode from '../NodeMailer/SendVerificationCode';
import SendWelcomeMail from '../NodeMailer/SendWelcomeMail';
import SendPasswordResetEmail from '../NodeMailer/SendPasswordResetEmail';
import SendResetSuccessfulMail from '../NodeMailer/SendResetSuccessfulMail'

const signup = async (req: Request, res: Response) => {
  try {
    const { username, password, confirmPassword, email } = req.body;

    const EmailalreadyExists = await user.findOne({ email });
    if (EmailalreadyExists) {
      return res.status(400).json({ error: "Email already Exists! Please choose a different Email!" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const verificationCode = GenerateVerificationCode();

    const newUser = new user({
      username,
      password: hashedPassword,
      email,
      verificationCode,
      verificationCodeExpiresAt: Date.now() + 15 * 60 * 1000
    });
    await newUser.save();
    GenerateJWTTokenAndCookie(newUser._id, res);

    await Promise.all(categories.map(async (category) => {
      await BudgetModel.create({
        userID: newUser._id,
        category,
        amount: 1000,
        period: 'week'
      });
    }));
    
    await SendVerificationCode(newUser.username, newUser.email, verificationCode);
    res.status(201).json({
      message: "signup successful!"
    });

  } catch (error) {
    console.log("Error: signup", error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};

const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { ReceivedCode } = req.body;
    const User = await user.findOne({
      verificationCode: ReceivedCode,
      verificationCodeExpiresAt: { $gt: Date.now() }
    });

    if (!User) {
      return res.status(400).json({ error: "Invalid or Expired verification code" });
    }

    User.isVerified = true;
    User.verificationCode = undefined;
    User.verificationCodeExpiresAt = undefined;
    await User.save();

    await SendWelcomeMail(User.email, User.username)
    return res.status(201).send({
      sucesss: true,
      message: "Email Verified Successfully",
      username: User.username,
      email: User.email
    });

  } catch (error) {
    console.log("Error: verify-email", error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};

const forgetPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const User = await user.findOne({ email });
    if (!User) {
      return res.status(400).json({ error: "Invalid E-mail address" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000);
    User.resetPasswordToken = resetToken;
    User.resetPasswordExpiresAt = resetTokenExpiresAt;

    await User.save();
    res.status(201).json({ success: true, message: "password reset link send successfully!" });
    await SendPasswordResetEmail(User.username, User.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

  } catch (error) {
    console.log("Error: forget-password", error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};

const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const User = await user.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() }
    });

    if (!User) {
      return res.status(400).json({ error: "Invalid or Expired Reset Token" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    User.password = hashedPassword;
    User.resetPasswordToken = undefined;
    User.resetPasswordExpiresAt = undefined;
    await User.save();

    await SendResetSuccessfulMail(User.username, User.email);
    return res.status(201).json({ success: true, message: "password reset successfully!" });

  } catch (error) {
    console.log("Error: reset-password", error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const User = await user.findOne({ email });
    const CheckPassword = await bcrypt.compare(password, User?.password ?? "");

    if (!User || !CheckPassword) {
      console.log("Login Invalid Credentials Error");
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    GenerateJWTTokenAndCookie(User._id, res)
    return res.status(201).send({
      ID: User._id,
      email: User.email
    });

  } catch (error) {
    console.log("Error: login", error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};

const logout = (req: Request, res: Response) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(201).json({ message: "Logged Out Successfully!" });

  } catch (error) {
    console.log("Error: logout", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const checkAuth = async (req: Request | any, res: Response) => {
  try {
    const User = await user.findById(req.userID).select("-password");
    if (!User) {
      return res.status(400).json({ error: "User Not Found!" });
    }

    return res.status(201).json({ success: true, User });

  } catch (error) {
    console.log("Error: check Auth", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export { signup, verifyEmail, forgetPassword, resetPassword, login, logout, checkAuth };
