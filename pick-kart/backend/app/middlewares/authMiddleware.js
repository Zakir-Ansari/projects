const jwt = require('jsonwebtoken');
const AppError = require('../models/AppError');
const verifyToken = (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer')) token = authHeader.split(' ')[1];
  if (!token) throw new AppError('Authorization is required. Please provide a valid token!', 401);

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    throw new AppError('Invalid Token!', 400);
  }
};

module.exports = verifyToken;
