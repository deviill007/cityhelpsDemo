import dbConnect from '../../../backend/utils/dbConnect';
import User from '../../../backend/models/User';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ message: 'Email and OTP are required' });
    }

    try {
        await dbConnect();
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if OTP is correct and not expired
        const isOtpMatch = user.otp === otp;
        const isOtpValid = user.otpExpiresAt && user.otpExpiresAt > new Date();

        if (!isOtpMatch || !isOtpValid) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        // Update user: mark as validated and clear OTP fields
        user.isValidated = true;
        user.otp = null;
        user.otpExpiresAt = null;
        await user.save();

        return res.status(200).json({ message: 'OTP verified successfully', validated: true });

    } catch (error) {
        console.error('Error verifying OTP:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}
