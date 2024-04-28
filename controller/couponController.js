const Coupon = require('../models/couponModel');
const validateMongodbid = require('../utils/validateMongodbid');
const asyncHandler = require('express-async-handler');


// Create a new Coupon
const creatCoupon = asyncHandler(async (req, res) => {

    try {
        
        const newCoupon = await Coupon.create(req.body)
        res.json(newCoupon)

    } catch (error) {
        throw new Error (error)
    }

});

// Get All Coupon
const getAllCoupon = asyncHandler(async (req, res) => {

    try {

        const getAllCoupon = await Coupon.find();
        res.json(getAllCoupon);

    } catch (error) {
        throw new Error (error);
    }

});

// Get a Singel Coupon
const getaCoupon = asyncHandler(async (req, res) => {

    const { id } = req.params;
    validateMongodbid(id);

    try {
        
        const getaCoupon = await Coupon.findById(id);
        res.json(getaCoupon);

    } catch (error) {
        throw new Error (error);
    }

});

// Update Coupon
const updateCoupon = asyncHandler(async (req, res) => {

    const { id } = req.params;
    validateMongodbid(id);

    try {
        
        const updateCoupon = await Coupon.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updateCoupon);

    } catch (error) {
        throw new Error (error);
    }

});

// Delete Coupon
const deleteCoupon = asyncHandler(async (req, res) => {

    const { id } = req.params;
    validateMongodbid(id);

    try {
        
        const deleteCoupon = await Coupon.findByIdAndDelete(id);
        res.json(deleteCoupon);

    } catch (error) {
        throw new Error (error);
    }

});

module.exports = { creatCoupon, getAllCoupon, getaCoupon, updateCoupon, deleteCoupon };