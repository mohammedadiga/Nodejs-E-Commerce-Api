const express = require('express');
const { createBlog, getAllBlog, getaBlog, updateBlog, deleteBlog, likeBlog, dislikeBlog, uploadImages } = require('../controller/blogController');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, isAdmin, createBlog);

router.get('/', getAllBlog);
router.get('/:id', getaBlog);


router.put('/likes', authMiddleware, likeBlog);
router.put('/dislikes', authMiddleware, dislikeBlog);

router.put('/:id', authMiddleware, isAdmin, updateBlog);
router.put('/upload/:id', uploadImages);

router.delete('/:id', authMiddleware, isAdmin, deleteBlog);



module.exports = router;