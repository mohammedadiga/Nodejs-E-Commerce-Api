const express = require('express');
const { createUser, loginUser, getAllUser, getaUser, deleteUser, updatedUser } = require('../controller/userController');
const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);

router.get('/all-users', getAllUser);
router.get('/:id', getaUser);

router.put('/:id', updatedUser);

router.delete('/:id', deleteUser);

module.exports = router;