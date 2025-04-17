import dbConnect from '../../../backend/utils/dbConnect';
import User from '../../../backend/models/User';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    try {
        await dbConnect();
        const user = await User.findOne({ email });

        if (!user) {
            // If the user does not exist, return a response indicating they need to register
            return res.status(200).json({ exists: false });
        }

        // If the user exists, check if they used Google authentication or credentials
        if (user.authProvider === 'google') {
            // If the user used Google auth, tell them to continue with Google login
            return res.status(200).json({
                exists: true,
                provider: 'google',
                message: 'Please continue with Google to log in.'
            });
        }

        // If the user is found but used email authentication, check if they are validated
        if (!user.isVerified) {
            // If they are not verified, we will ask them to validate via OTP
            return res.status(200).json({
                exists: true,
                provider: 'credentials',
                validated: false,
                message: 'Email not validated. Please verify your email to proceed.'
            });
        }

        // If the user is verified, return the provider and ask for their password to log in
        return res.status(200).json({
            exists: true,
            provider: 'credentials',
            validated: true,
            message: 'Please enter your password to log in.'
        });

    } catch (err) {
        console.error('Error checking email:', err);
        return res.status(500).json({ error: 'Server error' });
    }
}
