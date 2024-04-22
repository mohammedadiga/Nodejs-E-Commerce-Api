const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler');
const validateMongodbid = require("../utils/validateMongodbid");
const slugify = require('slugify');

// Create a new product
const creatProduct = asyncHandler(async (req, res) => {

    try {
        
        if(req.body.title) {
            req.body.slug = slugify(req.body.title);
        }

        const newProduct = await Product.create(req.body);
        res.json(newProduct);

    } catch (error) {
        throw new Error(error);
    }

});

// Get All product
const getAllProduct = asyncHandler(async (req, res) => {

    try {

        //  Filtrering Product

        // Get All Request Query
        const queryObj = {...req.query};
        const excludeFields = ["page", "sort", "limit", "fields"];

        // Delete Exclude Fields in query Object
        excludeFields.forEach((el) => delete queryObj[el]);

        // Convert a query object to Json
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

        let query = Product.find(JSON.parse(queryStr));
        


        // Sorting Product

        if(req.query.sort){
            
            const sortBy = req.query.sort.split(",").join(" ");
            query = query.sort(sortBy);

        }else {
            query = query.sort("-createdAt");
        }


        // limiting the fields

        if(req.query.fields){
            
            const fields = req.query.fields.split(",").join(" ");
            query = query.select(fields);

        }else{
            query = query.select("-__v");
        }


        // pagination

        const page = req.query.page;
        const limit = req.query.limit;

        const skip = limit * (page - 1);

        query = query.skip(skip).limit(limit);

        if(req.query.page) {

            const productCount = await Product.countDocuments();
            if(skip >= productCount) throw new Error("This Page does not exists");

        }

        const product = await query;
        res.json(product);

    } catch (error) {
        throw new Error(error);
    }

});

// Get a Singel product
const getaProduct = asyncHandler(async (req, res) => {

    const { id } = req.params;
    validateMongodbid(id)

    try {
        
        const gitaProduct = await Product.findById(id);
        res.json(gitaProduct);

    } catch (error) {
        throw new Error(error);
    }

});

// Update product
const updateProduct = asyncHandler(async (req, res) => {

    const { id } = req.params;
    validateMongodbid(id)

    try {

        if(req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        
        const updateProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updateProduct);

    } catch (error) {
        throw new Error(error);
    }

});

// Delete product
const deleteProduct = asyncHandler(async (req, res) => {

    const { id } = req.params;
    validateMongodbid(id)

    try {
 
        const deleteProduct = await Product.findByIdAndDelete(id);
        res.json(deleteProduct);

    } catch (error) {
        throw new Error(error);
    }

});

module.exports = {
    creatProduct,
    getAllProduct,
    getaProduct,
    updateProduct,
    deleteProduct
}