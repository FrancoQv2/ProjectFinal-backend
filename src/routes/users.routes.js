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
    verifyLogin
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
const checksVerifyLogin = [
    check('username','Debe agregar un nombre de usuario').not().isEmpty(),
    check('username','El nombre de usuario debe tener como mínimo 3 caracteres').isLength({min:3}),
    check('password','Debe agregar la contraseña').notEmpty(),
    check('password','El password debe debe tener como mínimo de 6 caracteres').isLength({min:6})
];

router.route('/')
    .post(checksCreateUser,createUser)
    .get(getUsers);

router.route('/user/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

router.route('/deleted')
    .get(getUsersDeleted);

router.route('/deleted/:id')
    .get(getUserDeleted)
    .put(recoverUserDeleted);

router.route('/login')
    .post(checksVerifyLogin,verifyLogin)

module.exports = router;
