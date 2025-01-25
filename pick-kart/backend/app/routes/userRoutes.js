const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const authorizedRoles = require('../middlewares/roleMiddleware');
const userController = require('../controllers/userController');
const ROLES = require('../enums/roles');

router.get('/getUsers', verifyToken, authorizedRoles([ROLES.ADMIN]), userController.getAllUsers);
router.put('/updateUser', verifyToken, userController.updateProfile);

module.exports = router;
