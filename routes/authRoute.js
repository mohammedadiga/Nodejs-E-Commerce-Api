const express = require('express');
const { createUser, loginUser, getAllUser, getaUser, updatedUser, deleteUser, blockUser, unblockUser, handleRefreshtoken, logout, updatePassword } = require('../controller/userController');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();




router.post('/register', createUser);
router.post('/login', loginUser);

router.get('/all-users', getAllUser);
router.get('/get-user', authMiddleware, isAdmin, getaUser);

router.put('/edit-user', authMiddleware, updatedUser);

router.delete('/:id', deleteUser);

router.put('/block-user/:id', authMiddleware, isAdmin, blockUser);
router.put('/unblock-user/:id', authMiddleware, isAdmin, unblockUser);

router.get('/refresh', handleRefreshtoken);
router.get('/logout', logout);

router.put('/password', authMiddleware, updatePassword);


module.exports = router;