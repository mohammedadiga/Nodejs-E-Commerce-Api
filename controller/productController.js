const Product = require("../models/productModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongodbid = require("../utils/validateMongodbid");
const slugify = require("slugify");

// Create a new product
const creatProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
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
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];

    // Delete Exclude Fields in query Object
    excludeFields.forEach((el) => delete queryObj[el]);

    // Convert a query object to Json
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Product.find(JSON.parse(queryStr));

    // Sorting Product

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // limiting the fields

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // pagination

    const page = req.query.page;
    const limit = req.query.limit;

    const skip = limit * (page - 1);

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const productCount = await Product.countDocuments();
      if (skip >= productCount) throw new Error("This Page does not exists");
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
  validateMongodbid(id);

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
  validateMongodbid(id);

  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }

    const updateProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateProduct);
  } catch (error) {
    throw new Error(error);
  }
});

// Delete product
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbid(id);

  try {
    const deleteProduct = await Product.findByIdAndDelete(id);
    res.json(deleteProduct);
  } catch (error) {
    throw new Error(error);
  }
});

// Add product To Wishlist
const addToWishlist = asyncHandler(async (req, res) => {

  const { _id } = req.user;
  const { productId } = req.body;

  try {
    const user = await User.findById(_id);
    const alreadyIndex = user.wishlist.findIndex((id) => id.toString() === productId);


    if (alreadyIndex === -1) {
        user.wishlist.push(productId);
    } else {
        user.wishlist.pull(productId);
    }

    await user.save();
    res.json(user);

  } catch (error) {
    throw new Error(error);
  }
});

// Add a rating for the product
const rating = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, productId, comment } = req.body;


  try {

    const product = await Product.findById(productId);

    if (!product) {
        throw new Error("Product not found");
    }

    const alreadyRatedIndex = product.ratings.findIndex((rating) => rating.postedby.toString() === _id.toString());

    if (alreadyRatedIndex === -1) {

            // User hasn't rated the product, add a new rating
            product.ratings.push({
                postedby: _id,
                star: star,
                comment: comment,
            });

    } else {

        // User has already rated the product, update the existing rating
        product.ratings[alreadyRatedIndex].star = star;
        product.ratings[alreadyRatedIndex].comment = comment;

    }

    const totalRating = product.ratings.length;
    const ratingSum = product.ratings.reduce((sum, rating) => sum + rating.star, 0);
    const actualRating = Math.round(ratingSum / totalRating);

    product.totalrating = actualRating;

    // Save the updated product
    await product.save();
    res.json(product);

    } catch (error) {
    throw new Error(error);
  }

});

module.exports = {
  creatProduct,
  getAllProduct,
  getaProduct,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
};
