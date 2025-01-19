const express = require('express');
const router = express.Router();

router.get('/getUsers', (req, res, next) => {
  res.json({ message: 'Admin accessible' });
});

module.exports = router;
