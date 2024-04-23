const express = require('express');
const { creatCategory, getAllBlogCategories, getaBlogCategory, updateBlogCategories, deleteBlogCategories } = require('../controller/blogCategoryController');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();


router.post('/', authMiddleware, isAdmin, creatCategory);

router.get('/', getAllBlogCategories);
router.get('/:id', getaBlogCategory);

router.put('/:id', authMiddleware, isAdmin, updateBlogCategories);

router.delete('/:id', authMiddleware, isAdmin, deleteBlogCategories);

module.exports = router;