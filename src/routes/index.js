const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send({ message: 'API running OK' });
});

module.exports = router;
