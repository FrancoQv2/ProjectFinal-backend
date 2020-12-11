const express = require('express');
const { check } = require('express-validator');
const userCtrl = require('../controllers/user.controller');

const {
    createUser,
    getUsers,
    findUser,
    deleteUser,
    updateUser,
    deleteAllUsers
} = userCtrl;

const router = express.Router();

//Alta de Usuarios
//Obtener Usuarios
//Borrado masivo de usuarios
router.route('/users/')
    .post([
        check('name','El nombre es obligatorio!').not().isEmpty(),
        check('email','El email es obligatorio!').not().isEmpty(),
        check('email','Debe ser formato email!').isEmail(),
        check('password','Debe agregar la contraseña').notEmpty(),
        check('password','El password debe ser de un minimo de 6 caracteres').isLength({min:6})
    ],createUser)
    .get(getUsers)
    .delete(deleteAllUsers);

//Trear 1 usuario por id
//Borrar un usuario con el id
//Actualizar Usuario
router.route('/user/:id')
    .get(findUser)
    .delete(deleteUser)
    .put(updateUser);

module.exports = router;
