'use strict';
var express = require('express');
var router = express.Router();
var controller = require('../controller/email');
var schemaSendEmail = require('../schema/email/sendEmail');
var schemaAdduserNewLester = require('../schema/email/addEmailNewLester');
var token = require('../middelware/authToken');

/* GET users listing. */
router.post('/', schemaSendEmail, controller.postEmail);
router.get('/getEmail', token, controller.getAllEmail);
router.post('/addUserNewLester', schemaAdduserNewLester, controller.addEmailNewLester)


module.exports = router;
