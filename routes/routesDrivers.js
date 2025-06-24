const express =  require('express');
const router = express.Router();
const Ficha = require('../models/fichas');
const { route } = require('./authRoutes');

router.get('/', async (req, res) => {
    try{
        const fichas = await Ficha.find();
        res.json(fichas);
    } catch(error){
        res.status(500).json({error: 'Error al obtener fichas', error});

    }
});

router.get('/:fichaId', async (req, res) => {
  try {
    const ficha = await Ficha.findOne({ ficha: req.params.fichaId });

    if (!ficha) {
      return res.status(404).json({ error: 'Ficha no encontrada' });
    }

    res.json(ficha);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar la ficha' });
  }
});

router.post('/', async (req, res) => {
    try {
        const {ficha, name, location, schools} = req.body;
        const nuevaFicha = new Ficha({ficha, name, location, schools});
        await nuevaFicha.save();
        res.status(200).json(nuevaFicha);
    } catch (error) {
        res.status(400).json({error: 'Error al crear la ficha'});
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
