'use strict';
var express = require('express');
var router = express.Router();
var controller = require('../controller/ProjectUser');
var limiter = require('../middelware/limiter/users/users');
var token = require('../middelware/authToken');
var multer = require('../middelware/multer');
var SchemaCreateProject = require('../schema/project/createProject');
var ValidCommentaireSchema = require('../schema/project/commentaireProject')

/* GET users listing. */
router.post('/', token, SchemaCreateProject, limiter, multer, controller.createProject);
router.get('/one-project/:id', token, limiter, controller.getOneProject);
router.post('/post-commentaire-project', ValidCommentaireSchema, token, limiter, controller.postCommentaireProject);
router.get('/get-commentaire-project/:id', token, limiter, controller.getCommentaire);

module.exports = router;
