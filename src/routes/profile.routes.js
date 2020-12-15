const express = require('express');
const { check } = require('express-validator');
const profileCtrl = require('../controllers/profile.controller');
const { post } = require('./users.routes');

const {
    addProfile,
    getProfiles
} = profileCtrl;

const router = express.Router();

// router.route('/')
//     post(addProfile)
//     .get(getProfiles)
//     ;



module.exports = router;
