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
 *     summary: Deactivate a User [Only Admins]
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
 *     summary: Activate a User [Only Admins]
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
 * /user/addToWishList:
 *   post:
 *     summary: Add a product to wishlist [Only Users]
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
router.delete('/removeFromWishList', verifyToken, authorizedRoles([ROLES.USER]), userController.removeFromWishList);
router.get('/getWishList', verifyToken, authorizedRoles([ROLES.USER]), userController.getWishList);
router.post('/addToCartList', verifyToken, authorizedRoles([ROLES.USER]), userController.addToCartList);
router.delete('/removeFromCartList', verifyToken, authorizedRoles([ROLES.USER]), userController.removeFromCartList);
router.get('/getCartList', verifyToken, authorizedRoles([ROLES.USER]), userController.getCartList);
router.get('/me', verifyToken, userController.getUserProfile);

module.exports = router;
