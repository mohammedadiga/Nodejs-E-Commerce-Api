const express = require('express');
const { creatProduct, getaProduct, getAllProduct, updateProduct, deleteProduct, addToWishlist, rating } = require('../controller/productController');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

// post
router.post('/',authMiddleware ,isAdmin, creatProduct);

// get
router.get('/', getAllProduct);
router.get('/:id', getaProduct);

// put
router.put("/rating", authMiddleware, rating);
router.put('/wishlist',authMiddleware, addToWishlist);
router.put('/:id', authMiddleware ,isAdmin, updateProduct);


// delete
router.delete('/:id',authMiddleware ,isAdmin, deleteProduct);
router.delete('/:id',authMiddleware ,isAdmin, deleteProduct);

module.exports = router;