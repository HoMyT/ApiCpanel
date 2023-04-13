'use strict';
var express = require('express');
var router = express.Router();
var controller = require('../controller/imgEntreprise');
var token = require('../middelware/authToken');
var multer = require('../middelware/multer');

/* GET home page. */
router.post('/', token, multer, controller.updateImgEntreprise);

module.exports = router;
