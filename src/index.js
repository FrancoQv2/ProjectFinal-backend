const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('./database');
const userRouter = require('./routes/users.routes');
const cardRouter = require('./routes/cards.routes');
const profileRouter = require('./routes/profile.routes');
const initialSetup = require('./libs/initialSetup');

const app = express();
initialSetup.createAdmin();

// Puerto de la App
const PORT = process.env.PORT || 4000;

// Iniciar la App
app.listen(PORT, () => {
    console.log(path.join(__dirname, "../public"));
    console.log(`** Server on Port ${PORT} **`);
});

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

// Rutas
app.use('/api/users', userRouter);
app.use('/api/cards', cardRouter);
app.use('/api/profiles', profileRouter);
