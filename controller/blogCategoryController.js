const Category = require('../models/blogCategoryModel');
const asyncHandler = require('express-async-handler');
const validateMongodbid = require("../utils/validateMongodbid");

// Create a new blog Category
const creatCategory = asyncHandler(async (req, res) => {

    try {
        
        const newCategory = await Category.create(req.body)
        res.json(newCategory)

    } catch (error) {
        throw new Error (error)
    }

});


// Get All blog Categories
const getAllBlogCategories = asyncHandler(async (req, res) => {

    try {

        const getAllBlogCategories = await Category.find();
        res.json(getAllBlogCategories);

    } catch (error) {
        throw new Error (error);
    }

});

// Get a Singel blog Category
const getaBlogCategory = asyncHandler(async (req, res) => {

    const { id } = req.params;
    validateMongodbid(id);

    try {
        
        const getaBlogCategory = await Category.findById(id);
        res.json(getaBlogCategory);

    } catch (error) {
        throw new Error (error);
    }

});

// Update blog Categories
const updateBlogCategories = asyncHandler(async (req, res) => {

    const { id } = req.params;
    validateMongodbid(id);

    try {
        
        const updateBlogCategories = await Category.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updateBlogCategories);

    } catch (error) {
        throw new Error (error);
    }

});

// Delete blog Categories
const deleteBlogCategories = asyncHandler(async (req, res) => {

    const { id } = req.params;
    validateMongodbid(id);

    try {
        
        const deleteBlogCategories = await Category.findByIdAndDelete(id);
        res.json(deleteBlogCategories);

    } catch (error) {
        throw new Error (error);
    }

});

module.exports = { creatCategory, getAllBlogCategories, getaBlogCategory, updateBlogCategories, deleteBlogCategories };