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
router.put('/updateUser', verifyToken, userController.updateProfile);
router.put('/deactivateUser', verifyToken, authorizedRoles([ROLES.ADMIN]), userController.deactivateUser);
router.put('/activateUser', verifyToken, authorizedRoles([ROLES.ADMIN]), userController.activateUser);
router.post('/addToWishList', verifyToken, authorizedRoles([ROLES.USER]), userController.addToWishList);
router.delete('/removeFromWishList', verifyToken, authorizedRoles([ROLES.USER]), userController.removeFromWishList);
router.get('/getWishList', verifyToken, authorizedRoles([ROLES.USER]), userController.getWishList);
router.post('/addToCartList', verifyToken, authorizedRoles([ROLES.USER]), userController.addToCartList);
router.delete('/removeFromCartList', verifyToken, authorizedRoles([ROLES.USER]), userController.removeFromCartList);
router.get('/getCartList', verifyToken, authorizedRoles([ROLES.USER]), userController.getCartList);

module.exports = router;
