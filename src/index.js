const express = require('express');
const app = express();

const morgan = require('morgan');

const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('./database');

// Puerto de la App
const PORT = process.env.PORT || 4000;

app.use(morgan('dev'));

// Utilizar las rutas
app.use('/api',require('./routes'));

// Iniciar la App
app.listen(PORT, () => {
    console.log(`** El servidor está funcionando en el puerto ${PORT} **`);
});
