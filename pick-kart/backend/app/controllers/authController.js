const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AppError = require('../models/AppError');
const AppResponse = require('../models/AppResponse');
const ROLES = require('../enums/roles');

const register = async (req, res, next) => {
  try {
    const { email, password, role, firstName, lastName } = req.body;

    // Reject if role is ADMIN
    if (role === ROLES.ADMIN) {
      throw new AppError(`Only Admins can create or update accounts as admins`, 403);
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError('Email is already registered.', 400);
    }

    // Create user with embedded profile
    const newUser = new User({
      email,
      password,
      role,
      profile: {
        firstName,
        lastName,
      },
    });

    await newUser.save();

    res.status(201).json({ message: `User registered with email ${email}` });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // If user is not found
    if (!user) throw new AppError(`User with ${email} not found!`, 404);

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new AppError('Invalid credentials', 401);

    // Check if user is active
    if (!user.isActive) throw new AppError('User is not active.', 403);

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send only the token in the response
    res.status(200).json(new AppResponse({ token }, 'Login successful.'));
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
