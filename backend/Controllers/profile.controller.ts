import { Request, Response } from 'express';
import user from '../Models/user.model.ts';
import bcrypt from 'bcryptjs';

const getProfile = async (req: Request, res: Response) => {
  try {
    const { userID } = req;
    const User = await user.findById(userID);

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
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error });
  }
};

const updateProfile = async (req: Request, res: Response) => {
  try {
    const { userID } = req;
    const { username, password, contactNumber, gender, language, dateOfBirth } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const updatedUser = await user.findByIdAndUpdate(
      userID,
      {
        username,
        password: hashedPassword,
        contactNumber,
        gender,
        language,
        dateOfBirth
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Profile updated successfully',
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error });
  }
};

export { getProfile, updateProfile };