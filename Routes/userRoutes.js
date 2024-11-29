

const express = require('express');
const router = express.Router();
const userController = require('../controller/User_controller');
const { body } = require('express-validator');
const authMiddleware=require('../middleware/authMiddleware')    // #important for  middle ware....


// Register User Route
router.post('/register', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 3 }).withMessage('Password must be at least 3 characters long'),
], userController.registerUser);


// Login User Route
router.post('/login', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 3 }).withMessage('Password must be at least 3 characters long'),
], userController.loginUser);


//profile router
router.get('/profile', authMiddleware.authUser, (req, res, next) => {
    userController.profileUser(req, res, next).catch(next);
});
 

router.get('/logout', authMiddleware.authUser, userController.logoutUser)

module.exports = router;







