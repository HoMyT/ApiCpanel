'use strict';
var express = require('express');
var router = express.Router();
var limiter = require('../middelware/limiter/users/users')
var token = require('../middelware/authToken');
var controller = require('../controller/users');
var schemaInscriptionUser = require('../schema/user/userInscription');
var schemaConnexionUser = require('../schema/user/userSchemaConnexion');


router.post('/', limiter, schemaInscriptionUser, controller.InscriptionUsers);
router.post('/connexion', limiter, schemaConnexionUser, controller.ConnexionUsers);
router.get('/info-project/', limiter, token, controller.infoProject);
router.get('/logo-entreprise', limiter, token, controller.logoEntreprise);

module.exports = router;
