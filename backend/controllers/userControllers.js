import User from '../models/userModel.js';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email.trim().length === 0 || password.trim().length === 0) {
            return res.status(400).json({ message: 'all fields are required' });
        }

        const user = await User.findOne({ email });
        if (user) {
            const hashedPassword = user.password;
            const match = await bcrypt.compare(password, hashedPassword);

            if (match) {
                console.log(typeof user);
                console.log(typeof user._id);
                const token = jwt.sign({ userId: user._id }, process.env.ACCESS_SECRET_KEY);

                return res.status(200).json({ message: 'login successfull', token });
            }
            else {
                return res.status(401).json({ message: 'wrong email or password' });
            }
        }
        else {
            return res.status(404).json({ message: 'user not found' });
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


export const signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (name.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0) {
            return res.status(400).json({ message: 'all fields are required' });
        }

        const user = await User.findOne({ email });

        if (user) {
            return res.status(409).json({ message: 'please change email. This email already exists.' });
        }
        else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = await User.create({ name, email, password: hashedPassword, cardsArr: [] });

            const token = jwt.sign({ userId: newUser._id }, process.env.ACCESS_SECRET_KEY);
            return res.status(200).json({ message: 'signup successfull', token });
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

export const getUserName = async (req, res) => {
    try {
        const { userId } = req.user;

        const user = await User.findById(userId).select('-email -password -cardsArr');
        // const user = await User.findById(userId, '-email -password -cardsArr');

        return res.status(200).json({ name: user.name });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}