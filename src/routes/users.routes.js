const express = require('express');
const { check } = require('express-validator');
const userCtrl = require('../controllers/user.controller');

const {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    getUsersDeleted,
    getUserDeleted,
    recoverUserDeleted,
    addCardToUserDeck
    // ,addRandomCard
    // ,deleteCard
} = userCtrl;

const router = express.Router();
const checksCreateUser = [
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
];

//Alta de Usuarios
//Obtener Usuarios
//Borrado masivo de usuarios
router.route('/')
    .post(checksCreateUser,createUser)
    .get(getUsers);

//Trear 1 usuario por id
//Borrar un usuario con el id
//Actualizar Usuario
router.route('/user/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

router.route('/deck/:id')
    .get(addCardToUserDeck);

router.route('/deleted')
    .get(getUsersDeleted);

router.route('/deleted/:id')
    .get(getUserDeleted)
    .put(recoverUserDeleted);

module.exports = router;
