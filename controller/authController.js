const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const validateMongodbid = require("../utils/validateMongodbid");
const { generateRefreshToken } = require("../config/refreshtoken");
const jwt = require("jsonwebtoken");


// Register
const createUser = asyncHandler(async (req, res) => {

  const email = req.body.email;

  // check if user already exists or not
  const findUser = await User.findOne({ email });

  if (!findUser) {

    try {

        const newUser = await User.create(req.body);
        res.json(newUser);
        
    } catch (error) {
        throw new Error(error);
    }

  } else {
    throw new Error("User Aleady Exists");
  }
});

// login a user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // check if user already exists or not
  const findUser = await User.findOne({ email });

  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findUser?.id);

    const updateuser = await User.findByIdAndUpdate(
      findUser?.id,
      { refreshToken: refreshToken },
      { new: true }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
    });

    res.json({
      id: findUser.id,
      firstname: findUser.firstname,
      lastname: findUser.lastname,
      email: findUser.email,
      mobile: findUser.mobile,
      token: generateToken(findUser?.id),
    });
  } else {
    throw new Error("Invalid Credent");
  }
});

// Unblock a user
const logout = asyncHandler(async (req, res) => {
  try {
    const cookie = req.cookies;

    if (!cookie?.refreshToken) throw new Error("No Refresh Token in cookie");

    const refreshToken = cookie.refreshToken;

    const user = await User.findOne({ refreshToken });

    if (!user) {
      res.clearCookie("refreshToken", { httpOnly: true, secure: true });
      return res.sendStatus(204); // forbidden
    }

    await User.findByIdAndUpdate(
      user.id,
      {
        refreshToken: "",
      },
      { new: true }
    );

    res.clearCookie("refreshToken", { httpOnly: true, secure: true });
    return res.sendStatus(204); // forbidden
  } catch (error) {
    throw new Error(error);
  }
});

// Handle Refresh Token
const handleRefreshtoken = asyncHandler(async (req, res) => {
  try {
    const cookie = req.cookies;

    if (!cookie?.refreshToken) throw new Error("No Refresh Token in cookie");

    const refreshToken = cookie.refreshToken;

    const user = await User.findOne({ refreshToken });
    if (!user) throw new Error("No Refresh presses in db or not matched");

    jwt.verify(refreshToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err || user.id !== decoded.id)
        throw new Error("There is something wrong with refresh token");

      const accessToken = generateToken(user?.id);
      res.json({ accessToken });
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Update User Password
const updatePassword = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { password } = req.body;
  validateMongodbid(id);

  const user = await User.findById(id);

  if (password) {
    
    try {
      
      user.password = password;
      const updatedPassword = await user.save();
      req.json(updatedPassword);

    } catch (error) {
      throw new Error(error);
    }

  } else {
    req.json(user);
  }
});

module.exports = { createUser, loginUser, logout, handleRefreshtoken, updatePassword };