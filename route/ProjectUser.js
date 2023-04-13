'use strict';
var express = require('express');
var router = express.Router();
var controller = require('../controller/ProjectUser');
var limiter = require('../middelware/limitRequete');
var token = require('../middelware/authToken');
var multer = require('../middelware/multer');

/* GET users listing. */
router.post('/', limiter, token, multer, controller.createProject);
router.get('/one-project/:id', token, controller.getOneProject);
router.post('/post-commentaire-project', token, controller.postCommentaireProject);
router.get('/get-commentaire-project/:id', token, controller.getCommentaire);

module.exports = router;
