const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const authorizedRoles = require('../middlewares/roleMiddleware');
const productController = require('../controllers/productController');
const ROLES = require('../enums/roles');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management APIs
 */

/**
 * @swagger
 * /product/createCategory:
 *   post:
 *     summary: Create a new category (Admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []  # Requires JWT Token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Electronics"
 *               description:
 *                 type: string
 *                 example: "All electronic items"
 *     responses:
 *       201:
 *         description: Category created successfully
 *       403:
 *         description: Forbidden - Only Admins can create categories
 */
router.post('/createCategory', verifyToken, authorizedRoles([ROLES.ADMIN]), productController.createCategory);

/**
 * @swagger
 * /product/createProduct:
 *   post:
 *     summary: Create a new product (Seller only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []  # Requires JWT Token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created successfully
 *       403:
 *         description: Forbidden - Only Sellers can create products
 */
router.post('/createProduct', verifyToken, authorizedRoles([ROLES.SELLER]), productController.createProduct);

/**
 * @swagger
 * /product/updateProduct:
 *   put:
 *     summary: Update an existing product (Seller only)
 *     tags: [Products]
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
 *               name:
 *                 type: string
 *                 example: "Updated Product Name"
 *               price:
 *                 type: number
 *                 example: 30
 *               description:
 *                 type: string
 *                 example: "Updated product description"
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       403:
 *         description: Forbidden - Only Sellers can update products
 */
router.put('/updateProduct', verifyToken, authorizedRoles([ROLES.SELLER]), productController.updateProduct);

/**
 * @swagger
 * /product/getProducts:
 *   get:
 *     summary: Get all products (Only first image)
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/getProducts', productController.getProducts);

/**
 * @swagger
 * /product/getProduct/{productId}:
 *   get:
 *     summary: Get a specific product by ID (All images)
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product details with all images
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */
router.get('/getProduct/:productId', productController.getProduct);

module.exports = router;
