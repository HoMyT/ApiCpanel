'use strict';
var express = require('express');
var router = express.Router();
var controller = require('../controller/imgEntreprise');
var limiter = require('../middelware/limiter/imgEntreprise/imgEntreprise')
var token = require('../middelware/authToken');
var multer = require('../middelware/multer');
var SchemaImgEntreprise = require('../schema/img/logoEntreprise')

/* GET home page. */
router.post('/', SchemaImgEntreprise, token, limiter, multer, controller.updateImgEntreprise);

module.exports = router;
