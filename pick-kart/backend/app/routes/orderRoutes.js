const express = require('express');
const orderController = require('../controllers/orderController');
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
 *       - bearerAuth: []
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
 *     summary: Retrieve all orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all orders
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
 * /order/updateOrder/{id}:
 *   put:
 *     summary: Update an order status
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *                 example: "65bfc437e8298c4f9eeb27d9"
 *               status:
 *                 type: string
 *                 enum: ["Submitted", "Accepted", "Shipped", "Out of Delivery", "Delivered", "Cancelled"]
 *     responses:
 *       200:
 *         description: Order updated successfully
 */
router.put('/changeOrderStatus', verifyToken, orderController.changeOrderStatus);

module.exports = router;
