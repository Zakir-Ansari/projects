const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AppError = require('../models/AppError');
const AppResponse = require('../models/AppResponse');

const register = async (req, res, next) => {
  try {
    const { username, password, email, role } = req.body;
    const newUser = new User({ username, password, email, role });
    await newUser.save();
    res.status(201).json({ message: `User registered with username ${username}` });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).populate('profile.wishList').populate({
      path: 'profile.cartList.product', // Populate the `product` field inside `cartList`
      model: 'Product',
    }); // Populate product details in cartList
    const isMatch = await bcrypt.compare(password, user?.password ?? '');

    // If credentials are invalid
    if (!user) throw new AppError(`User ${username} not found!`, 404);
    if (!isMatch) throw new AppError('Invalid credentials', 401);
    if (!user.isActive) throw new AppError('User is not active.', 403);

    // If user is valid with valid password
    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Prepare user details excluding the password
    const { password: _, profile, username: userName, email } = user.toObject(); // Exclude password by destructuring
    const responseData = {
      token,
      user: {
        username: userName,
        email,
        ...profile,
        wishList: profile.wishList.length > 0 ? profile.wishList : undefined,
        cartList: profile.cartList.length > 0 ? profile.cartList : undefined,
      },
    };
    // Respond with token and user details
    res.status(200).json(new AppResponse(responseData, 'Login successful.'));
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
