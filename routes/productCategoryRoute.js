const express = require('express');
const { creatCategory, getAllProductCategories, getaProductCategory, updateProductCategories, deleteProductCategories } = require('../controller/productCategoryController');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();


router.post('/', creatCategory);

router.get('/', getAllProductCategories);
router.get('/:id', getaProductCategory);

router.put('/:id', updateProductCategories);

router.delete('/:id', deleteProductCategories);

module.exports = router;