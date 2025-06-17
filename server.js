const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// require('dotenv').config();

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const PORT = process.env.PORT || 3000;


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', require('./routes/authRoutes'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB');
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => console.error('❌ Error al conectar con MongoDB', err));
