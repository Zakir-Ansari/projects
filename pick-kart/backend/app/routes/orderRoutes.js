const express = require('express');
const orderController = require('../controllers/orderController');
const { authenticate } = require('../middlewares/authMiddleware');
const verifyToken = require('../middlewares/authMiddleware');
const authorizedRoles = require('../middlewares/roleMiddleware');
const ROLES = require('../enums/roles');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management APIs
 */

/**
 * @swagger
 * /order/createOrder:
 *   post:
 *     summary: Create a new Order (User only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []  # Requires JWT Token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Orders created successfully
 *       400:
 *         description: Bad Request - Invalid orders data
 */
router.post('/createOrder', verifyToken, authorizedRoles([ROLES.USER]), orderController.createOrder);

/**
 * @swagger
 * /order/getOrders:
 *   get:
 *     summary: Get all Orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []  # Requires JWT Token
 *     responses:
 *       200:
 *         description: Admins can get All orders. Seller and User can get their owned orders only
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */
router.get('/getOrders', verifyToken, orderController.getOrders);

/**
 * @swagger
 * /order/changeOrderStatus:
 *   put:
 *     summary: Change order status
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []  # Requires JWT Token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "65bfc437e8298c4f9eeb27d9"
 *               status:
 *                 type: string
 *                 example: 'Accepted, Shipped, Out of Delivery, Delivered, Cancelled'
 *     responses:
 *       201:
 *         description: Order status updated successfully
 *       400:
 *         description: Invalid/Unauthorized order status
 *       403:
 *         description:
 *          'Unauthorized: You can only change the status of orders for products you created |
 *          Unauthorized: You can only change the status of your own orders'
 *       404:
 *         description: Not Found - Order not found
 */
router.put('/changeOrderStatus', verifyToken, orderController.changeOrderStatus);

module.exports = router;
