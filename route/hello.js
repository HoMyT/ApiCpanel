'use strict';
var express = require('express');
var controller = require('../controller/hello')
var router = express.Router();


/* GET users listing. */
router.get('/', controller.hello);



module.exports = router;
