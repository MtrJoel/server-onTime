const express = require('express');
const router = express.Router();
const Ficha = require('../models/fichas');
const { verifyToken, requireRole } = require('../middlewares/authmiddleware');

// ✅ 1. Obtener todas las fichas (admin o supervisor)
// GET /api/fichas
router.get('/', verifyToken, async (req, res) => {
  try {
    const fichas = await Ficha.find();
    res.json(fichas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener fichas', detalle: error.message });
  }
});

// ✅ 2. Crear una nueva ficha (solo admin)
// POST /api/fichas
router.post('/', verifyToken, requireRole('admin'), async (req, res) => {
  try {
    const nuevaFicha = new Ficha(req.body);
    await nuevaFicha.save();
    res.status(201).json(nuevaFicha);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear la ficha', detalle: error.message });
  }
});

// ✅ 3. Obtener ficha por ID
// GET /api/fichas/:id
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const ficha = await Ficha.findById(req.params.id);
    if (!ficha) return res.status(404).json({ error: 'Ficha no encontrada' });
    res.json(ficha);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener ficha', detalle: error.message });
  }
});

// ✅ 4. Eliminar ficha por ID (solo admin)
// DELETE /api/fichas/:id
router.delete('/:id', verifyToken, requireRole('admin'), async (req, res) => {
  try {
    const ficha = await Ficha.findByIdAndDelete(req.params.id);
    if (!ficha) return res.status(404).json({ error: 'Ficha no encontrada' });
    res.json({ mensaje: 'Ficha eliminada con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar ficha', detalle: error.message });
  }
});

module.exports = router;








// // routes/routeRoutes.js
// const express = require('express');
// const router = express.Router();
// const routeController = require('../controllers/routeController');
// const { verifyToken, requireRole } = require('../middlewares/authmiddleware');

// // Ruta para chofer autenticado: ver sus rutas asignadas
// router.get('/me', verifyToken, requireRole('user'), routeController.getMyRoutes);

// // Ruta para admin: asignar una nueva ruta a un chofer
// router.post('/', verifyToken, requireRole('admin'), routeController.createRoute);

// module.exports = router;
