const express = require('express');
const { check } = require('express-validator');
const cardCtrl = require('../controllers/card.controller');

const {
    createCard,
    getCards,
    getCard,
    updateCard,
    deleteCard,
    getCardsDeleted,
    getCardDeleted,
    recoverCardDeleted
} = cardCtrl;

const router = express.Router();
const checksCreateCard = [
    check('name','El nombre es obligatorio!').not().isEmpty(),
    check('img','La imagen es obligatoria!').not().isEmpty(),
    check('type','El tipo es obligatorio!').not().isEmpty(),
    check('rarity','Su rareza es obligatoria!').not().isEmpty(),
    check('power','El poder es obligatorio!').not().isEmpty()
];

router.route('/')
    .post(checksCreateCard,createCard)
    .get(getCards);

router.route('/card/:id')
    .get(getCard)
    .put(updateCard)
    .delete(deleteCard);

router.route('/deleted')
    .get(getCardsDeleted);

router.route('/deleted/:id')
    .get(getCardDeleted)
    .put(recoverCardDeleted);

module.exports = router;
