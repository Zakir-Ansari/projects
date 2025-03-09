const express = require('express');
const cors = require('cors');
const app = express();
const { connectDB } = require('./config/db');
const AppError = require('./models/AppError');
const swaggerDocs = require('./config/swagger');

connectDB();

// 📌 Dynamic CORS Configuration Using `.env`
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:4200', // Default if ENV is missing
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Public route for app status
app.get('/', (req, res) => {
  res.status(200).json({ status: 'Active' });
});

// Swagger Documentation
swaggerDocs(app);
// Routes
app.use('/api/auth', require('./routes/authRoutes'));
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
