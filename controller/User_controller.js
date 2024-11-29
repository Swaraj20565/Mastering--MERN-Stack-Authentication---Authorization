

const userModel=require('../Model/userModel');
const userService = require('../services/userServices');
const { validationResult } = require('express-validator');
const blackListTokenModel=require('../Model/blacklistTokenmodel');


// Register User
module.exports.registerUser = async (req, res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { fullname, email, password } = req.body;
    const { firstname, lastname } = fullname;
    
    try {
        const hashPassword = await userService.hashPassword(password);
        const user = await userService.createUser({ firstname, lastname, email, password: hashPassword });
        console.log(req.body);
        
        const token = user.generateAuthToken();
        
        res.status(201).json({ token, user });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
}; 

// Login User
module.exports.loginUser = async (req, res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const {  email, password } = req.body;
    //existuser
    const user=await userModel.findOne({email:email}).select('+password');
    if(!user)
    {
        return res.status(401).json({message:'invalid Email or password'})
    }
    //correct email compared password to hash 
    const isMatch=await user.comparePassword(password);
    if(!isMatch)
    {
        return res.status(401).json({message:'invalid Email or password'})
    }
    const token = user.generateAuthToken();
    res.cookie("token",token)
        
    res.status(201).json({ token, user });
    
    
}; 

//profile Router
module.exports.profileUser = async (req, res) => {
    if (!req.user) {
        return res.status(400).json({ message: 'User data not found.' });
    }

    res.status(200).json(req.user); // Ensure proper HTTP status code.
};

//logout Router
module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];

    await blackListTokenModel.create({ token });

    res.status(200).json({ message: 'Logged out' });

}



