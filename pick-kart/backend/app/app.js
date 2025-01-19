const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const connectDB = require('./config/db');
const AppError = require('./models/AppError');
const verifyToken = require('./middlewares/authMiddleware');
const authorizeRoles = require('./middlewares/roleMiddleware');

connectDB();

app.use(bodyParser.json());

// Public route for app status
app.get('/', (req, res) => {
  res.status(200).json({ status: 'Active' });
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', verifyToken, authorizeRoles('Admin'), require('./routes/adminRoutes'));
app.use('/api/seller', verifyToken, authorizeRoles('Seller'), require('./routes/sellerRoutes'));
app.use('/api/user', verifyToken, authorizeRoles('User'), require('./routes/userRoutes'));

// Catch all undefined routes and throw a 404 error
app.use((req, res, next) => {
  next(new AppError('Not Found', 404));
});

// Use the global error handler
app.use(require('./middlewares/globalErrorHandler'));

module.exports = app;
