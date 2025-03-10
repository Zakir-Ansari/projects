const AppError = require('../models/AppError');

const authorizedRoles = allowedRoles => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      throw new AppError('Access Denied', 403);
    }
    next();
  };
};

module.exports = authorizedRoles;
