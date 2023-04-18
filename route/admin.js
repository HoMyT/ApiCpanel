'use strict';
var express = require('express');
var router = express.Router();
var limiter = require('../middelware/limiter/admin/adminLimiter')
var token = require('../middelware/authToken');
var controller = require('../controller/admin');


router.get('/', token, limiter, controller.getAllProject);
router.get('/one-project/:id', token, limiter, controller.getOneProject);
router.get('/get-email/', token, limiter, controller.getEmail);
module.exports = router;
