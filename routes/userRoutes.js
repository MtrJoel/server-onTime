const express = require('express');
const router = express.Router();
const Ficha = require('../models/fichas');
const User = require('../models/user');
const { verifyToken, requireRole  } = require('../middlewares/authmiddleware');

// ✅ Este endpoint devuelve la ficha del usuario autenticado
router.get('/fichas/usuarios', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id; // <- Esto viene del token decodificado
    const user = await User.findById(userId);

    if (!user || !user.fichaAsignada) {
      return res.status(404).json({ error: 'Ficha no asignada al usuario' });
    }

    const ficha = await Ficha.findOne({ ficha: user.fichaAsignada });

    if (!ficha) {
      return res.status(404).json({ error: 'Ficha no encontrada' });
    }

    res.json(ficha);
  } catch (error) {
    console.error('❌ Error en /fichas/usuarios:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});
router.put('/assign-ficha/:userId', verifyToken, requireRole('admin'), async (req, res) => {
  try {
    const { fichaAsignada } = req.body;
    const userId = req.params.userId;
    const user = await User.findByIdAndUpdate(userId, { fichaAsignada }, { new: true });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al asignar ficha", error: error.message });
  }
});

// Ruta solo para usuarios autenticados
router.get('/perfil', verifyToken, (req, res) => {
  res.json({
    mensaje: "Este es tu perfil",
    usuario: req.user
  });
});

// Ruta solo para administradores
router.get('/admin-panel', verifyToken, requireRole('admin'), (req, res) => {
  res.json({ mensaje: 'Acceso concedido al panel de administrador.' });
});


module.exports = router;
