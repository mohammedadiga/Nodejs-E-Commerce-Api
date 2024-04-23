const express = require('express');
const { creatBrand, getAllBrand, getaBrand, updateBrand, deleteBrand } = require('../controller/brandController');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');


const router = express.Router();


router.post('/', creatBrand);

router.get('/', getAllBrand);
router.get('/:id', getaBrand);

router.put('/:id', updateBrand);

router.delete('/:id', deleteBrand);

module.exports = router;