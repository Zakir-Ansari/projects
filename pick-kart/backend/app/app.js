const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const connectDB = require('./config/db');
const AppError = require('./models/AppError');
const swaggerDocs = require('./config/swagger');

connectDB();

app.use(bodyParser.json());

// Public route for app status
app.get('/', (req, res) => {
  res.status(200).json({ status: 'Active' });
});

// Swagger Documentation
swaggerDocs(app);
// Routes
app.use('/api/auth', require('./routes/authRoutes'));
//app.use('/api/admin', verifyToken, authorizedRoles('Admin'), require('./routes/adminRoutes'));
//app.use('/api/seller', verifyToken, authorizedRoles('Seller'), require('./routes/sellerRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/product', require('./routes/productRoutes'));
app.use('/api/order', require('./routes/orderRoutes'));

// Catch all undefined routes and throw a 404 error
app.use((req, res, next) => {
  next(new AppError('Url Not Found', 404));
});

// Use the global error handler
app.use(require('./middlewares/globalErrorHandler'));

module.exports = app;
