const ROLES = require('../enums/roles');

const addAllowedOrderStatuses = (req, res, next) => {
  if (req.user.role === ROLES.ADMIN || req.user.role === ROLES.SELLER)
    req.user.allowedOrderStatus = ['Accepted', 'Shipped', 'Out of Delivery', 'Delivered', 'Cancelled'];
  else req.user.allowedOrderStatus = ['Delivered', 'Cancelled'];
  next();
};

module.exports = addAllowedOrderStatuses;
