const express = require('express');
const { createUser, loginUser, handleRefreshtoken, logout, updatePassword } = require('../controller/authController');
const { authMiddleware, } = require('../middleware/authMiddleware');
const router = express.Router();

exports.router = router;


router.post('/register', createUser);
router.post('/login', loginUser);

router.get('/logout', logout);
router.get('/refresh', handleRefreshtoken);

router.put('/password', authMiddleware, updatePassword);


module.exports = router;