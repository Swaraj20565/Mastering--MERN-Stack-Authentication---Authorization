
//Middle ware....
const userModel = require('../Model/userModel');
const blackListTokenModel = require('../Model/blacklistTokenmodel'); // Assuming this exists
const jwt = require('jsonwebtoken');

module.exports.authUser = async (req, res, next) => {
    try {
        // Retrieve token from cookies or Authorization header
        const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided.' });
        }

        // Check if the token is blacklisted
        const isBlacklisted = await blackListTokenModel.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({ message: 'Unauthorized: Token has been revoked.' });
        }

        // Decode and verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch user based on the decoded token
        const user = await userModel.findById(decoded._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Attach user to the request object
        req.user = user;
        next(); // Proceed to the next middleware
    } catch (error) {
        console.error('Authorization Error:', error.message);
        return res.status(401).json({ message: 'Unauthorized: Invalid or expired token.' });
    }
};



