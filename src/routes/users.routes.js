const express = require('express');
const { check } = require('express-validator');
const userCtrl = require('../controllers/user.controller');

const {
    createUser,
    getUsers,
    getUserById,
    deleteUser,
    updateUser,
    activateUser
    // ,deleteAllUsers
    ,deleteUserLogic
} = userCtrl;

const router = express.Router();

//Alta de Usuarios
//Obtener Usuarios
//Borrado masivo de usuarios
router.route('/')
    .post([
        check('name','El nombre es obligatorio!').not().isEmpty(),
        check('last_name','El apellido es obligatorio!').not().isEmpty(),
        check('country','El país es obligatorio!').not().isEmpty(),
        check('age','Su edad es obligatoria!').not().isEmpty(),
        check('email','El email es obligatorio!').not().isEmpty(),
        check('email','Debe ser formato email!').isEmail(),
        check('username','Debe agregar un nombre de usuario').not().isEmpty(),
        check('username','El nombre de usuario debe tener como mínimo 3 caracteres').isLength({min:3}),
        check('password','Debe agregar la contraseña').notEmpty(),
        check('password','El password debe debe tener como mínimo de 6 caracteres').isLength({min:6})
    ],createUser)
    // .delete(deleteAllUsers)
    .get(getUsers);

//Trear 1 usuario por id
//Borrar un usuario con el id
//Actualizar Usuario
router.route('/user/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUserLogic);

router.route('/admin/:id')
    .put(activateUser)
    .delete(deleteUser);

module.exports = router;
