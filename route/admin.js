'use strict';
var express = require('express');
var router = express.Router();
var limiter = require('../middelware/limitRequete');
var token = require('../middelware/authToken');
var controller = require('../controller/admin');


router.get('/', token, limiter, controller.getAllProject);

module.exports = router;
