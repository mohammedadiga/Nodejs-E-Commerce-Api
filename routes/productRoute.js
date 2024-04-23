const express = require('express');
const { creatProduct, getaProduct, getAllProduct, updateProduct, deleteProduct, addToWishlist } = require('../controller/productController');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();


router.post('/',authMiddleware ,isAdmin, creatProduct);

router.get('/', getAllProduct);
router.get('/:id', getaProduct);


router.put('/wishlist',authMiddleware, addToWishlist);
router.put('/:id', authMiddleware ,isAdmin, updateProduct);



router.delete('/:id',authMiddleware ,isAdmin, deleteProduct);

router.delete('/:id',authMiddleware ,isAdmin, deleteProduct);

module.exports = router;