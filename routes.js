const express = require('express');
const router = express.Router();

// Crear un usuarios
// api/usuarios/
router.post('/usuarios/', (req,res) => {
    console.log('Creando usuario');
    res.send('Hola!');
});

module.exports = router;
