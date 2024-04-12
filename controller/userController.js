const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const { generateToken } = require('./jwtToken');

// Register
const createUser = asyncHandler(async (req, res) => {

    const email = req.body.email;

    // check if user already exists or not
    const findUser = await User.findOne({ email });

    if(!findUser){

        const newUser = await User.create(req.body);
        res.json(newUser);


    } else {
        throw new Error('User Aleady Exists');
    }

});

// login a user
const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    // check if user already exists or not
    const findUser = await User.findOne({ email });

    if(findUser && (await findUser.isPasswordMatched(password))){
        
        res.json({
            id: findUser.id,
            firstname: findUser.firstname,
            lastname: findUser.lastname,
            email: findUser.email,
            mobile: findUser.mobile,
            token: generateToken(findUser.id)
        });

    } else {
        throw new Error('Invalid Credent');
    }

});

// Get all user
const getAllUser = asyncHandler(async (req, res) => {

    try {
        
        const getAllUser = await User.find();
        res.json(getAllUser);

    } catch (error) {
        throw new Error(error);
    }
        


});

// Get a singl user
const getaUser = asyncHandler(async (req, res) => {

    try {
        
        res.json(req.user);

    } catch (error) {
        throw new Error(error);
    }
        
});

// Update a user
const updatedUser = asyncHandler(async (req, res) => {


    const { id } = req.user;

    try {
        
        const updateUser = await User.findByIdAndUpdate(id, {
            firstname: req?.body?.firstname,
            lastname: req?.body?.lastname,
            email: req?.body?.email,
            mobile: req?.body?.mobile
        }, {new: true}); 

        res.json(updateUser);

    } catch (error) {
        throw new Error(error);
    }
        
});

// Delete a user
const deleteUser = asyncHandler(async (req, res) => {

    const { id } = req.params;

    try {
        
        const deleteUser = await User.findByIdAndDelete(id);
        res.json(deleteUser);

    } catch (error) {
        throw new Error(error);
    }
        


});

// Block a user
const blockUser = asyncHandler(async (req, res) => {

    const { id } = req.params;

    try {

        await User.findByIdAndUpdate(id, { isBlocked: true }, {new: true});
        res.json({message: "User Blocked"});

    } catch (error) {
        throw new Error(error);
    }
        
});

// Unblock a user
const unblockUser = asyncHandler(async (req, res) => {

    const { id } = req.params;

    try {

        await User.findByIdAndUpdate(id, { isBlocked: false }, {new: true});
        res.json({message: "User Unblocked"});

    } catch (error) {
        throw new Error(error);
    }
        
});


module.exports = 
{ 
    createUser, 
    loginUser, 
    getAllUser, 
    getaUser,
    updatedUser,
    deleteUser,
    blockUser,
    unblockUser,
};