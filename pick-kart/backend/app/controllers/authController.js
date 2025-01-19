const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AppError = require('../models/AppError');

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
    const user = await User.findOne({ username });
    const isMatch = await bcrypt.compare(password, user?.password ?? '');

    // If credentials are invalid
    if (!user) throw new AppError(`User ${username} not found!`, 404);
    if (!isMatch) throw new AppError('Invalid credentials', 400);

    // If user is valid with valid password
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
