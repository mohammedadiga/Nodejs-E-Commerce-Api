const express = require('express');
const { creatBrand, getAllBrand, getaBrand, updateBrand, deleteBrand } = require('../controller/brandController');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');


const router = express.Router();


router.post('/', authMiddleware, isAdmin, creatBrand);

router.get('/', getAllBrand);
router.get('/:id', getaBrand);

router.put('/:id', authMiddleware, isAdmin, updateBrand);

router.delete('/:id', authMiddleware, isAdmin, deleteBrand);

module.exports = router;