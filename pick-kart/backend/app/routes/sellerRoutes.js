const express = require('express');
const router = express.Router();

router.get('/getProducts', (req, res) => {
  res.json({ message: 'Seller accessible' });
});

module.exports = router;
