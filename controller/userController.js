const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongodbid = require("../utils/validateMongodbid");

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
    const updateUser = await User.findByIdAndUpdate(
      id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      { new: true }
    );

    res.json(updateUser);
  } catch (error) {
    throw new Error(error);
  }
});

// Delete a user
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbid(id);

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
  validateMongodbid(id);

  try {
    await User.findByIdAndUpdate(id, { isBlocked: true }, { new: true });
    res.json({ message: "User Blocked" });
  } catch (error) {
    throw new Error(error);
  }
});

// Unblock a user
const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbid(id);

  try {
    await User.findByIdAndUpdate(id, { isBlocked: false }, { new: true });
    res.json({ message: "User Unblocked" });
  } catch (error) {
    throw new Error(error);
  }
});



module.exports = { getAllUser, getaUser, updatedUser, deleteUser, blockUser,  unblockUser };
