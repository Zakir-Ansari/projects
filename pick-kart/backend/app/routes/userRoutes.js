const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const authorizedRoles = require('../middlewares/roleMiddleware');
const userController = require('../controllers/userController');
const ROLES = require('../enums/roles');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management APIs
 */

/**
 * @swagger
 * /user/getUsers:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []  # Requires JWT Token
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/getUsers', verifyToken, authorizedRoles([ROLES.ADMIN]), userController.getAllUsers);

/**
 * @swagger
 * /user/updateProfile:
 *   put:
 *     summary: Update User details
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []  # Requires JWT Token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 example: "Wick"
 *               image:
 *                 type: string
 *                 example: "User image"
 *     responses:
 *       201:
 *         description: Updated user details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.put('/updateProfile', verifyToken, userController.updateProfile);

/**
 * @swagger
 * /user/deactivateUser:
 *   put:
 *     summary: Deactivate a User (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []  # Requires JWT Token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "65bfc437e8298c4f9eeb27d9"
 *     responses:
 *       201:
 *         description: 'User: xyz has been deactivated.'
 */
router.put('/deactivateUser', verifyToken, authorizedRoles([ROLES.ADMIN]), userController.deactivateUser);

/**
 * @swagger
 * /user/activateUser:
 *   put:
 *     summary: Activate a User (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []  # Requires JWT Token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "65bfc437e8298c4f9eeb27d9"
 *     responses:
 *       201:
 *         description: 'User: xyz has been activated.'
 */
router.put('/activateUser', verifyToken, authorizedRoles([ROLES.ADMIN]), userController.activateUser);

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete User by ID (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []  # Requires JWT Token
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The User ID
 *     responses:
 *       201:
 *         description: 'User with ID 1234 deleted successfully.'
 *       404:
 *         description: User not found
 */
router.delete('/:id', verifyToken, authorizedRoles([ROLES.ADMIN]), userController.deleteUserById);

/**
 * @swagger
 * /user/addToWishList:
 *   post:
 *     summary: Add a product to wishlist (User only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []  # Requires JWT Token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 example: "65bfc437e8298c4f9eeb27d9"
 *     responses:
 *       200:
 *         description: Product added to wishlist
 */
router.post('/addToWishList', verifyToken, authorizedRoles([ROLES.USER]), userController.addToWishList);

/**
 * @swagger
 * /user/removeFromWishList:
 *   delete:
 *     summary: Remove a product from wishlist (User only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []  # Requires JWT Token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 example: "65bfc437e8298c4f9eeb27d9"
 *     responses:
 *       200:
 *         description: Product removed from wishlist
 *       400:
 *         description: Product not found in wishlist
 */
router.delete('/removeFromWishList', verifyToken, authorizedRoles([ROLES.USER]), userController.removeFromWishList);

/**
 * @swagger
 * /user/getWishList:
 *   get:
 *     summary: Retrieve the user's wishlist (User only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []  # Requires JWT Token
 *     responses:
 *       200:
 *         description: List of products in the user's wishlist
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/getWishList', verifyToken, authorizedRoles([ROLES.USER]), userController.getWishList);

/**
 * @swagger
 * /user/addToCartList:
 *   post:
 *     summary: Add a product to cart (User only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []  # Requires JWT Token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 example: "65bfc437e8298c4f9eeb27d9"
 *               quantity:
 *                 type: number
 *                 example: 2
 *     responses:
 *       200:
 *         description: Product added to cart
 *       400:
 *         description: Invalid product ID or insufficient stock
 */
router.post('/addToCartList', verifyToken, authorizedRoles([ROLES.USER]), userController.addToCartList);

/**
 * @swagger
 * /user/removeFromCartList:
 *   delete:
 *     summary: Remove a product from cart (User only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []  # Requires JWT Token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 example: "65bfc437e8298c4f9eeb27d9"
 *     responses:
 *       200:
 *         description: Product removed from cart
 *       400:
 *         description: Product not found in cart
 */
router.delete('/removeFromCartList', verifyToken, authorizedRoles([ROLES.USER]), userController.removeFromCartList);

/**
 * @swagger
 * /user/getCartList:
 *   get:
 *     summary: Retrieve the user's cart items (User only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []  # Requires JWT Token
 *     responses:
 *       200:
 *         description: List of products in the user's cart
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/getCartList', verifyToken, authorizedRoles([ROLES.USER]), userController.getCartList);

/**
 * @swagger
 * /user/me:
 *   get:
 *     summary: Get logged-in user's profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []  # Requires JWT Token
 *     responses:
 *       200:
 *         description: User profile details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */

router.get('/me', verifyToken, userController.getUserProfile);

module.exports = router;
