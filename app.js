var debug = require('debug');
var express = require('express');
var path = require('path');
/*var favicon = require('serve-favicon');*/
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var xss = require('./middelware/xss');
// const cors = require("cors");
var fs = require('fs');

var routes = require('./route/index');
var users = require('./route/users');
var email = require('./route/email');
var projectUser = require('./route/ProjectUser');
var logoEntreprise = require('./route/imgEntreprise');
var hello = require('./route/hello');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//express.json pour utilise l'object express.json pour recupere les requetes envoyer par l'user
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//donnée l'acces de navigation a toute l'application pour evite les probleme de navigation
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use('/v2/', xss, routes);
app.use('/v2/users', xss, users);
app.use('/v2/email', xss, email);
app.use('/v2/logo-entreprise', xss, logoEntreprise);
app.use('/v2/project-user', xss, projectUser);

app.use("/img-entreprise", express.static(path.join(__dirname, "/img-entreprise")));
app.use('/v2', hello);


module.exports = app;