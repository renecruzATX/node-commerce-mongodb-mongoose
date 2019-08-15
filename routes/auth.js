const express = require('express');
const { check, body } = require('express-validator');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post(
    '/login', 
    body('email')   
        .isEmail()
        .withMessage('Please enter a valid email address.')
        .normalizeEmail(),
    body('password', 'Password has to be valid.')
        .isLength({min: 5})
        .isAlphanumeric()
        .trim(),
    authController.postLogin
);

router.post(
    '/signup', 
    check('email')
        .isEmail()
        .withMessage('Please enter a valid email address!')
        .custom((value, {req}) => {
            return User
                .findOne({email: value})
                .then(userDoc => {
                    if (userDoc) {
                        return Promise.reject(
                            'User with that email already exists.'
                        );
                    }
                });
        })
        .normalizeEmail(),
    body('password', 'Please enter a password with only numbers and text and longer than 5 characters.')
        .isLength({min: 5})
        .isAlphanumeric()
        .trim(),
    body('confirmPassword')
        .custom((value, {req}) => {
            if (value !== req.body.password) {
                throw new Error('Passwords must match!');
            }
            return true
        })
        .trim(),
    authController.postSignup
);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;