const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const authorizedRoles = require('../middlewares/roleMiddleware');
const productController = require('../controllers/productController');
const ROLES = require('../enums/roles');

router.post('/createCategory', verifyToken, authorizedRoles([ROLES.ADMIN]), productController.createCategory);
router.post('/createProduct', verifyToken, authorizedRoles([ROLES.SELLER]), productController.createProduct);
router.put('/updateProduct', verifyToken, authorizedRoles([ROLES.SELLER]), productController.updateProduct);
router.get('/getProducts', productController.getProducts);
router.get('/getProduct/:productId', productController.getProduct);

module.exports = router;
