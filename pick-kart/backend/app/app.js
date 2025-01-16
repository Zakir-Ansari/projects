const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');

//connectDB();

app.use(bodyParser.json());

// Public route for app status
app.get('/', (req, res) => {
  res.status(200).json({ status: 'Active1' });
});

// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/products', require('./routes/productRoutes'));
// app.use('/api/users', require('./routes/userRoutes'));
// app.use('/api/orders', require('./routes/orderRoutes'));

app.use(errorHandler);

module.exports = app;
