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

exports.deactivateUser = async (req, res, next) => {
  try {
    const { id } = req.body;
    const user = await User.findById(id);
    if (!user) throw new AppError(`User with id: ${id} not found`, 404);
    if (!user.isActive) throw new AppError(`User with id: ${id} is already inactive`, 409);

    user.isActive = false;
    await user.save();
    res.status(200).json(new AppResponse(null, `User: ${user.username} has been deactivated.`));
  } catch (error) {
    next(error);
  }
};

exports.activateUser = async (req, res, next) => {
  try {
    const { id } = req.body;
    const user = await User.findById(id);
    if (!user) throw new AppError(`User with id: ${id} not found`, 404);
    if (user.isActive) throw new AppError(`User with id: ${id} is already active`, 409);

    user.isActive = true;
    await user.save();
    res.status(200).json(new AppResponse(null, `User: ${user.username} has been activated.`));
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

exports.addToCartList = async (req, res, next) => {
  try {
    const { productId, count } = req.body;
    if (count < 1) {
      throw new AppError('Product count cannot be 0!', 400);
    }

    // Validate product existence
    const product = await Product.findById(productId);
    if (!product) {
      throw new AppError('Product not found!', 404);
    }

    // Find the user
    const user = await User.findById(req.user.id);

    // Check if the product exists in the cartList
    const cartItem = user.profile.cartList.find(item => item.product?.toString() === productId);

    if (cartItem) {
      // If the count is different, update it
      if (cartItem.count !== count) {
        cartItem.count = count;
        await user.save();
        return res.status(200).json(new AppResponse(null, 'Cart item count updated!'));
      }
      // If the count is the same, no update is needed
      return res.status(200).json(new AppResponse(null, 'Product already in the cart with the same count.'));
    }

    // Add the product to the cartList if it's not already there
    user.profile.cartList.push({ product: productId, count });
    await user.save();

    res.status(200).json(new AppResponse(null, 'Product added to cartList'));
  } catch (error) {
    next(error);
  }
};

exports.removeFromCartList = async (req, res, next) => {
  try {
    const { productId } = req.body;

    // Find the user
    const user = await User.findById(req.user.id);

    // Remove the product from the cartList
    user.profile.cartList = user.profile.cartList.filter(item => item.product?.toString() !== productId);
    await user.save();

    res.status(200).json(new AppResponse(null, 'Product removed from cartList'));
  } catch (error) {
    next(error);
  }
};

exports.getCartList = async (req, res, next) => {
  try {
    const data = await User.findById(req.user.id)
      .populate({
        path: 'profile.cartList.product', // Populate the `product` field inside `cartList`
        model: 'Product',
      })
      .exec();
    res.status(200).json(new AppResponse(data.profile.cartList));
  } catch (error) {
    next(error);
  }
};
