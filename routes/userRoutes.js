const express = require('express');
const router = express.Router();
const Ficha = require('../models/fichas');
const User = require('../models/user');
const { verifyToken, requireRole } = require('../middlewares/authmiddleware');

// ✅ 1. Obtener perfil del usuario autenticado
// GET /api/usuarios/perfil
router.get('/perfil', verifyToken, (req, res) => {
  res.json({
    mensaje: "Este es tu perfil",
    usuario: req.user
  });
});

// ✅ 2. Obtener ficha asignada al usuario autenticado
// GET /api/usuarios/ficha
router.get('/ficha', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
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
    console.error('❌ Error en /ficha:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// ✅ 3. Asignar ficha a un usuario (solo admin)
// PUT /api/usuarios/:id/ficha
router.put('/:id/ficha', verifyToken, requireRole('admin'), async (req, res) => {
  try {
    const { ficha } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { fichaAsignada: ficha },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    res.json({ mensaje: "Ficha asignada correctamente", user });
  } catch (error) {
    res.status(500).json({ message: "Error al asignar ficha", error: error.message });
  }
});

// ✅ 4. Panel exclusivo para admin (opcional)
// GET /api/usuarios/admin-panel
router.get('/admin-panel', verifyToken, requireRole('admin'), (req, res) => {
  res.json({ mensaje: 'Acceso concedido al panel de administrador.' });
});

router.get('/', verifyToken, requireRole('admin'), async (req, res) => {
  const users = await User.find();
  res.json(users);
});


module.exports = router;
