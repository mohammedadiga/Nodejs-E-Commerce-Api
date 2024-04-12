const express = require('express');
const { createUser, loginUser, getAllUser, getaUser, updatedUser, deleteUser, blockUser, unblockUser } = require('../controller/userController');
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

module.exports = router;