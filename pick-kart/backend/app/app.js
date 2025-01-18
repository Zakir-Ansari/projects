const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const connectDB = require('./config/db');
const globalErrorHandler = require('./middlewares/globalErrorHandler');
const AppError = require('./models/AppError');

connectDB();

app.use(bodyParser.json());

// Public route for app status
app.get('/', (req, res) => {
  res.status(200).json({ status: 'Active1' });
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));

// Catch all undefined routes and throw a 404 error
app.use((req, res, next) => {
  next(new AppError('Not Found', 404));
});

// Use the global error handler
app.use(globalErrorHandler);

module.exports = app;
