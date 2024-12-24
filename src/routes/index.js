const express = require('express');
const { login, profile } = require('../controllers/authController');
const { authenticateJWT } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', (req, res) => {
  res.send({ message: 'API running OK' });
});

router.post('/login', login);

// Ruta protegida para obtener perfil
router.get('/profile', authenticateJWT, profile);
module.exports = router;
