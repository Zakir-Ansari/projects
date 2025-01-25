const AppError = require('../models/AppError');
const AppResponse = require('../models/AppResponse');
const User = require('../models/User');
const Product = require('../models/Product');

exports.getAllUsers = async (req, res, next) => {
  try {
    res.status(200).json(new AppResponse(await User.find({}).select('-password')));
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { firstName, lastName, image } = req.body;
    const response = await User.updateOne(
      { _id: userId },
      {
        $set: {
          'profile.firstName': firstName,
          'profile.lastName': lastName,
          'profile.image': image,
        },
      }
    );
    res.status(200).json(new AppResponse(response));
  } catch (error) {
    next(error);
  }
};

exports.addToWishList = async (req, res, next) => {
  try {
    const { productId } = req.body;
    // Check if the product exists
    const product = await Product.findById(productId);
    // Find the user and add the product to the wishlist
    const user = await User.findById(req.user.id);

    if (!product) {
      throw new AppError('Product not found!', 404);
    }

    // Add the product to the wishlist if it's not already there
    if (!user.profile.wishList.includes(productId)) {
      user.profile.wishList.push(productId);
      await user.save();
    }

    res.status(200).json(new AppResponse(null, 'Product added to wishlist'));
  } catch (error) {
    next(error);
  }
};

exports.removeFromWishList = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user.id);

    // Remove the product from the wishlist
    user.profile.wishList = user.profile.wishList.filter(item => item.toString() !== productId.toString());
    await user.save();

    res.status(200).json(new AppResponse(null, 'Product removed from wishlist'));
  } catch (error) {
    next(error);
  }
};

exports.getWishList = async (req, res, next) => {
  try {
    const data = await User.findById(req.user.id).populate('profile.wishList').exec();
    res.status(200).json(new AppResponse(data.profile.wishList));
  } catch (error) {
    next(error);
  }
};
