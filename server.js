const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Ficha = require('./models/fichas')
// require('dotenv').config();

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const PORT = process.env.PORT || 3000;


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', require('./routes/authRoutes'));
app.use('/api/fichas', require('./routes/routesDrivers'));


mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ Conectado a MongoDB');
    const count = await Ficha.countDocuments();
    if( count === 0){
      await Ficha.create({
        ficha: 'F-09',
        name: 'Name of Driver',
        location: 'San Cristobal',
        school: 'nnnnnn'
          
        
      });
      console.log('Datos de ejemplo creados')
    }

    app.listen(process.env.PORT, '0.0.0.0', () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => console.error('❌ Error al conectar con MongoDB', err));
