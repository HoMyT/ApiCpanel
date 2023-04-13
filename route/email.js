'use strict';
var express = require('express');
var router = express.Router();
var controller = require('../controller/email');
var limiter = require('../middelware/limitRequete');
var schemaSendEmail = require('../schema/email/sendEmail');
var schemaAdduserNewLester = require('../schema/email/addEmailNewLester')
var token = require('../middelware/authToken');

/* GET users listing. */
router.post('/', limiter, schemaSendEmail, controller.postEmail);
router.get('/getEmail', token, controller.getAllEmail);
router.delete('/delete/:id', limiter, token, controller.DeleteEmail);
router.post('/addUserNewLester', limiter, schemaAdduserNewLester, controller.addEmailNewLester)


module.exports = router;
