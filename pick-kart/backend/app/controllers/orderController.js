const ROLES = require('../enums/roles');
const AppError = require('../models/AppError');
const AppResponse = require('../models/AppResponse');
const Order = require('../models/Order');
const Product = require('../models/Product');

// Create Orders (multiple orders in a single request)
exports.createOrder = async (req, res, next) => {
  try {
    const orders = req.body; // Expecting an array of orders
    if (!Array.isArray(orders) || orders.length === 0) {
      throw new AppError('Invalid orders data', 400);
    }
    // check for valid request data
    orders.forEach(order => {
      if (!order.product || !order.quantity) {
        throw new AppError('Each order must have a product and quantity', 400);
      }
      // check for available stock
      const product = Product.findById(order.product);
      if (!product || product.stock < order.quantity) {
        throw new AppError(`Insufficient stock for product: ${product.name}`, 400);
      }
    });

    const savedOrders = await Order.insertMany(
      orders.map(order => ({
        ...order,
        buyer: req.user.id, // Attach the buyer from authenticated user
      }))
    );

    res.status(201).json(new AppResponse(savedOrders, 'Orders created successfully'));
  } catch (error) {
    next(error);
  }
};

// Get all orders based on user role
exports.getOrders = async (req, res, next) => {
  try {
    let orders;

    if (req.user.role === ROLES.ADMIN) {
      // Admin can fetch all orders
      orders = await Order.find()
        .populate({
          path: 'product',
          populate: { path: 'createdBy', select: 'username email' }, // Populate product creator details
        })
        .populate('buyer', 'username email');
    } else if (req.user.role === ROLES.SELLER) {
      // Seller can fetch orders where the product is created by the seller
      orders = await Order.find()
        .populate({
          path: 'product',
          match: { createdBy: req.user.id }, // Filter products created by seller
          populate: { path: 'createdBy', select: 'username email' },
        })
        .populate('buyer', 'username email');

      // Filter out null product orders (orders where the seller doesn't own the product)
      orders = orders.filter(order => order.product !== null);
    } else {
      // User can fetch only their own orders
      orders = await Order.find({ buyer: req.user.id }).populate('product');
    }

    res.status(200).json(new AppResponse(orders));
  } catch (error) {
    next(error);
  }
};

// Change order status (Admin/Seller)
exports.changeOrderStatus = async (req, res, next) => {
  try {
    const { orderId, status } = req.body;
    const validStatuses = req.user.allowedOrderStatus;

    if (!validStatuses.includes(status)) {
      throw new AppError('Invalid/Unauthorized order status', 400);
    }

    const order = await Order.findById(orderId).populate('product');
    if (!order) {
      throw new AppError('Order not found', 404);
    }

    // Seller can only update status if they created the product
    if (!order.product || order.product.createdBy.toString() !== req.user.id) {
      throw new AppError('Unauthorized: You can only change the status of orders for products you created', 403);
    }

    // User can only update the status of their own orders
    if (order.buyer.toString() !== req.user.id) {
      throw new AppError('Unauthorized: You can only change the status of your own orders', 403);
    }

    order.status = status;
    await order.save();

    res.status(201).json(new AppResponse(order, 'Order status updated successfully'));
  } catch (error) {
    next(error);
  }
};
