import dbConnect from '../../../backend/utils/dbConnect';
import User from '../../../backend/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { setTokenCookie } from '../../../backend/utils/setTokenCookie';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password, name, phone } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    await dbConnect();
    const user = await User.findOne({ email });

    if (user?.authProvider === 'google') {
      return res.status(403).json({
        message: 'This account was created using Google. Please continue with Google login.',
      });
    }

    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!user.isValidated) {
      return res.status(403).json({ message: 'Email not verified' });
    }

    // ✅ First-time user: no password yet
    if (!user.password) {
      if (!name || !phone) {
        return res.status(400).json({ message: 'Name and phone are required for first-time users' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      user.name = name;
      user.phone = phone;
      user.password = hashedPassword;
      await user.save();

      const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });

      setTokenCookie(res, token);

      return res.status(200).json({
        message: 'Account created and logged in',
        newUser: true,
        user: {
          name: user.name,
          email: user.email,
          phone: user.phone,
        },
      });
    }

    // ✅ Returning user
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    setTokenCookie(res, token);

    return res.status(200).json({
      message: 'Login successful',
      newUser: false,
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}
