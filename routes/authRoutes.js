const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authcontroller');
const { verifyToken, requireRole, authMiddleware } = require('../middlewares/authmiddleware');

router.post('/register', authCtrl.register); // opcional para admin
router.post('/login', authCtrl.login);

// Rutas protegidas según rol
router.get('/admin', verifyToken, requireRole('admin'), (req, res) => {
  res.json({ message: 'Hola Admin 👑' });
});

router.get('/user', verifyToken, requireRole('user'), (req, res) => {
  res.json({ message: 'Hola Usuario 😎' });
});


module.exports = router;
