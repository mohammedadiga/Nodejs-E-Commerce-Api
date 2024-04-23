const Blog = require('../models/blogModel');
const asyncHandler = require('express-async-handler');
const validateMongodbid = require("../utils/validateMongodbid");
const cloudinaryUploadImg = require('../utils/cloudinary');

// Create a new blog
const createBlog = asyncHandler(async (req, res) => {

    try {
        
        const newBlog = await Blog.create(req.body);
        res.json(newBlog);

    } catch (error) {
        throw new Error (error);
    }

});

// Get All blog
const getAllBlog = asyncHandler(async (req, res) => {

    try {

        const getAllBlog = await Blog.find();
        res.json(getAllBlog);

    } catch (error) {
        throw new Error (error);
    }

});

// Get a Singel blog
const getaBlog = asyncHandler(async (req, res) => {

    const { id } = req.params;
    validateMongodbid(id);

    try {
        
        const getaBlog = await Blog.findById(id);
        res.json(getaBlog);

    } catch (error) {
        throw new Error (error);
    }

});

// Update blog
const updateBlog = asyncHandler(async (req, res) => {

    const { id } = req.params;
    validateMongodbid(id);

    try {
        
        const updateBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updateBlog);

    } catch (error) {
        throw new Error (error);
    }

});

// Delete blog
const deleteBlog = asyncHandler(async (req, res) => {

    const { id } = req.params;
    validateMongodbid(id);

    try {
        
        const deleteBlog = await Blog.findByIdAndDelete(id);
        res.json(deleteBlog);

    } catch (error) {
        throw new Error (error);
    }

});

// Like the blog
const likeBlog = asyncHandler(async (req, res) => {

    const { blogId } = req.body;
    validateMongodbid(blogId);

    // Find the blog which you want to be liked
    const blog = await Blog.findById(blogId);
    
    // find the login user
    const loginUserId = req?.user?._id;

    // find if the user has liked the blog
    const userLiked = blog?.like?.find(
        (userId) => userId?.toString() === loginUserId?.toString()
    );

    // find if the user has disliked the blog
    const userDisliked = blog?.dislike?.find(
        (userId) => userId?.toString() === loginUserId?.toString()
    );


    if (!userLiked){

        await Blog.findByIdAndUpdate(
            blogId,
            {
                $addToSet: { like: loginUserId },
            },
            {news: true}
        );

        if(userDisliked){

            await Blog.findByIdAndUpdate(
                blogId,
                {
                    $pull: { dislike: loginUserId },
                },
                {news: true}
            );

        }

    } else {

        await Blog.findByIdAndUpdate(
            blogId,
            {
                $pull: { like: loginUserId },
            },
            {news: true}
        );

    }


    const newBlog = await Blog.findById(blogId);
    res.json(newBlog);

});

// Dislike the blog
const dislikeBlog = asyncHandler(async (req, res) => {

    const { blogId } = req.body;
    validateMongodbid(blogId);

    // Find the blog which you want to be liked
    const blog = await Blog.findById(blogId);
    
    // find the login user
    const loginUserId = req?.user?._id;

    // find if the user has liked the blog
    const userLiked = blog?.like?.find(
        (userId) => userId?.toString() === loginUserId?.toString()
    );

    // find if the user has disliked the blog
    const userDisliked = blog?.dislike?.find(
        (userId) => userId?.toString() === loginUserId?.toString()
    );

    if (!userDisliked){

        await Blog.findByIdAndUpdate(
            blogId,
            {
                $addToSet: { dislike: loginUserId },
            },
            {news: true}
        );

        if(userLiked){

            await Blog.findByIdAndUpdate(
                blogId,
                {
                    $pull: { like: loginUserId },
                },
                {news: true}
            );

        }

    } else {

        await Blog.findByIdAndUpdate(
            blogId,
            {
                $pull: { dislike: loginUserId },
            },
            {news: true}
        );

    }

    const newBlog = await Blog.findById(blogId);
    res.json(newBlog);



});

// Upload Images
const uploadImages = asyncHandler(async (req, res) => {

    // const { id } = req.params;
    // validateMongodbid(id);

    // try {

    //     const uploader = (path) => cloudinaryUploadImg(path, "images");
    //     const urls = [];
    //     const files = req.files;

    //     for (const file of files){
    //         console.log(file);
    //     }




        
    // } catch (error) {
    //     throw new Error (error);
    // }

});

module.exports = {createBlog, getAllBlog, getaBlog, updateBlog, deleteBlog, likeBlog, dislikeBlog, uploadImages}; 