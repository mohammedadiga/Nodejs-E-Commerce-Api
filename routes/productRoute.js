const express = require('express');
const { creatProduct, getaProduct, getAllProduct, updateProduct, deleteProduct } = require('../controller/productController');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();


router.post('/',authMiddleware ,isAdmin, creatProduct);

router.get('/', getAllProduct);
router.get('/:id', getaProduct);

router.put('/:id',authMiddleware ,isAdmin, updateProduct);

router.delete('/:id',authMiddleware ,isAdmin, deleteProduct);

module.exports = router;