const express = require('express');
const router = express.Router();

router.get('/getCart', (req, res) => {
  res.json({ message: 'User accessible' });
});

module.exports = router;
