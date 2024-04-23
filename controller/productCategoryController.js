const Category = require('../models/prouctCategoryModel');
const asyncHandler = require('express-async-handler');
const validateMongodbid = require("../utils/validateMongodbid");

// Create a new product Category
const creatCategory = asyncHandler(async (req, res) => {

    try {
        
        const newCategory = await Category.create(req.body)
        res.json(newCategory)

    } catch (error) {
        throw new Error (error)
    }

});


// Get All product Categories
const getAllProductCategories = asyncHandler(async (req, res) => {

    try {

        const getAllProductCategories = await Category.find();
        res.json(getAllProductCategories);

    } catch (error) {
        throw new Error (error);
    }

});

// Get a Singel product Category
const getaProductCategory = asyncHandler(async (req, res) => {

    const { id } = req.params;
    validateMongodbid(id);

    try {
        
        const getaProductCategory = await Category.findById(id);
        res.json(getaProductCategory);

    } catch (error) {
        throw new Error (error);
    }

});

// Update product Categories
const updateProductCategories = asyncHandler(async (req, res) => {

    const { id } = req.params;
    validateMongodbid(id);

    try {
        
        const updateProductCategories = await Category.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updateProductCategories);

    } catch (error) {
        throw new Error (error);
    }

});

// Delete product Categories
const deleteProductCategories = asyncHandler(async (req, res) => {

    const { id } = req.params;
    validateMongodbid(id);

    try {
        
        const deleteProductCategories = await Category.findByIdAndDelete(id);
        res.json(deleteProductCategories);

    } catch (error) {
        throw new Error (error);
    }

});

module.exports = { creatCategory, getAllProductCategories, getaProductCategory, updateProductCategories, deleteProductCategories };