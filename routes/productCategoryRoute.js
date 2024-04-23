const express = require('express');
const { creatCategory, getAllProductCategories, getaProductCategory, updateProductCategories, deleteProductCategories } = require('../controller/productCategoryController');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();


router.post('/', authMiddleware, isAdmin, creatCategory);

router.get('/', getAllProductCategories);
router.get('/:id', getaProductCategory);

router.put('/:id', authMiddleware, isAdmin, updateProductCategories);

router.delete('/:id', authMiddleware, isAdmin, deleteProductCategories);

module.exports = router;