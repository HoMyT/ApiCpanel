const connection = require('../middelware/mysqlConnection');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.InscriptionUsers = (req, res, next) => {
    const { email, password, name, last_name } = req.body;
    const utilisateur = {
        uuid: connection.escape(uuidv4()),
        email: connection.escape(email),
        password: connection.escape(password),
        name: connection.escape(name),
        last_name: connection.escape(last_name)
    };

    bcrypt.genSalt(10, function (error, salt) {
        bcrypt.hash(utilisateur.password, salt, function (err, hash) {
            if (err) { res.status(401).json({ message: "An error occurred while encrypting your password, please try again" }) }
            else {
                $Sql = `INSERT INTO users(uuid, email, password, name, last_name) VALUES(${utilisateur.uuid}, ${utilisateur.email}, ${connection.escape(hash)}, ${utilisateur.name}, ${utilisateur.last_name})`;
                connection.query($Sql, function (error, results, fields) {
                    if (error) { return res.status(401).json({ message: `An error has occurred :${error}` }) }
                    else {
                        return res.status(201).json({ message: "User adds successfully" })
                    }
                })
            }
        })
    })
}

exports.ConnexionUsers = (req, res, next) => {
    const { email, password } = req.body;
    const bodyEmail = connection.escape(email);
    const bodyPassword = connection.escape(password);
    let $Sql = `SELECT * FROM users WHERE email = ${bodyEmail}`;
    connection.query($Sql, function (err, results, fields) {
        const Resultpassword = results.map(results => results.password);
        if (err) { return res.status(401).json({ message: `An error occurred while verifying your password, please try again: ${err}` }) }
        if (results.length === 0) { res.status(401).json({ message: `unknown user: ${bodyEmail}` }) }
        else {
            bcrypt.compare(bodyPassword, Resultpassword[0], function (err, resultsbcrypt) {
                if (err) { return res.status(401).json({ message: `An error occurred while verifying your password, please try again: ${err}`}) }
                if (!resultsbcrypt) { res.status(401).json({ message: "Your password is not valid!" }) }
                else {
                        const ResultUuid = results.map(obj => obj.uuid);
                    res.status(201).json({
                        message: 'You are connected !',
                        token: jwt.sign({ uuid: ResultUuid }, process.env.PASSTOKEN, { expiresIn: "1H" }),
                        expireIn: 1000*60*60
                    })
                }
            });
        }
    })
}

exports.infoProject = (req, res, next) => {
    $Sql = `SELECT uuid_project, uuid_client, name_project, descriptif_project, type_project FROM project_user WHERE uuid_client = ${JSON.stringify(req.auth.userId)}`;
    connection.query($Sql, (err, resultsProject, fields) => {
        if (err) { return res.status(401).json({message: `An error as been occured: ${err}`})}
        else { return res.status(201).json(resultsProject) }
    })
}

exports.logoEntreprise = (req, res, next) => {
    $Sql = `SELECT * FROM img_entreprise WHERE user_uuid = ${JSON.stringify(req.auth.userId)} LIMIT 1`;
    connection.query($Sql, (err, results, fields) => {
        if (err) { return res.status(401).json({message :"An error as been occured"})}
        else { return res.status(201).json(results)}
    })
}