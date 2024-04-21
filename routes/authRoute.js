const express = require('express');
const { createUser, loginUser, handleRefreshtoken, logout, updatePassword, forgotPasswordToken, resetPassword } = require('../controller/authController');
const { authMiddleware, } = require('../middleware/authMiddleware');
const router = express.Router();

exports.router = router;


router.post('/register', createUser);
router.post('/login', loginUser);
router.post('/forgot-password-token', forgotPasswordToken);

router.get('/logout', logout);
router.get('/refresh', handleRefreshtoken);

router.put('/password', authMiddleware, updatePassword);
router.put('/reset-password/:token', resetPassword);



module.exports = router;