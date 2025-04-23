import dbConnect from '../../../backend/utils/dbConnect';
import User from '../../../backend/models/User';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    try {
        await dbConnect();

        const existingUser = await User.findOne({ email });

        // Case 1: User exists and is already validated → ask for password
        if (existingUser && existingUser.isValidated) {
            return res.status(200).json({
                message: 'User already validated. Please login with password.',
                validated: true
            });
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        if (existingUser) {
            // Case 2: User exists but not validated → update OTP
            existingUser.otp = otp;
            existingUser.otpExpiresAt = otpExpiresAt;
            await existingUser.save();
        } else {
            // Case 3: New user → create with email and OTP
            const newUser = new User({
                email,
                otp,
                otpExpiresAt,
                isValidated: false,
                authProvider: 'credentials'
            });
            await newUser.save();
        }

        // Send OTP via email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: `"City Helps Support" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Verify Your CityHelps Account",
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
                    <div style="max-width: 600px; background: white; padding: 20px; margin: auto; border-radius: 8px;">
                        <h2 style="color: #333;">Hello ${email},</h2>
                        <p style="color: #555;">You're almost there! Use the OTP below to verify your CityHelps account:</p>
                        <h3 style="background: #007bff; color: white; padding: 10px; text-align: center; border-radius: 5px;">
                            ${otp}
                        </h3>
                        <p style="color: #555;">This OTP is valid for 10 minutes. If you didn't request this, please ignore this email.</p>
                        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                        <p style="font-size: 12px; color: #888; text-align: center;">
                            © ${new Date().getFullYear()} CityHelps. All rights reserved.
                        </p>
                    </div>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({
            message: 'OTP sent successfully',
            validated: false
        });

    } catch (error) {
        console.error('Error sending OTP:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}
