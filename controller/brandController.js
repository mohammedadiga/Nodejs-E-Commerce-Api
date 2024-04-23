const Brand = require('../models/brandModel');
const asyncHandler = require('express-async-handler');
const validateMongodbid = require("../utils/validateMongodbid");



// Create a new Brand
const creatBrand = asyncHandler(async (req, res) => {

    try {
        
        const newBrand = await Brand.create(req.body)
        res.json(newBrand)

    } catch (error) {
        throw new Error (error)
    }

});

// Get All Brand
const getAllBrand = asyncHandler(async (req, res) => {

    try {

        const getAllBrand = await Brand.find();
        res.json(getAllBrand);

    } catch (error) {
        throw new Error (error);
    }

});

// Get a Singel Brand
const getaBrand = asyncHandler(async (req, res) => {

    const { id } = req.params;
    validateMongodbid(id);

    try {
        
        const getaBrand = await Brand.findById(id);
        res.json(getaBrand);

    } catch (error) {
        throw new Error (error);
    }

});

// Update Brand
const updateBrand = asyncHandler(async (req, res) => {

    const { id } = req.params;
    validateMongodbid(id);

    try {
        
        const updateBrand = await Brand.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updateBrand);

    } catch (error) {
        throw new Error (error);
    }

});

// Delete Brand
const deleteBrand = asyncHandler(async (req, res) => {

    const { id } = req.params;
    validateMongodbid(id);

    try {
        
        const deleteBrand = await Brand.findByIdAndDelete(id);
        res.json(deleteBrand);

    } catch (error) {
        throw new Error (error);
    }

});

module.exports = { creatBrand, getAllBrand, getaBrand, updateBrand, deleteBrand };