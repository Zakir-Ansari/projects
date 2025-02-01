const express = require('express');
const orderController = require('../controllers/orderController');
const { authenticate } = require('../middlewares/authMiddleware');
const verifyToken = require('../middlewares/authMiddleware');
const authorizedRoles = require('../middlewares/roleMiddleware');
const ROLES = require('../enums/roles');

const router = express.Router();

router.post('/createOrder', verifyToken, authorizedRoles([ROLES.USER]), orderController.createOrder);
router.get('/getOrders', verifyToken, orderController.getOrders);
router.put('/changeOrderStatus', verifyToken, orderController.changeOrderStatus);

module.exports = router;
