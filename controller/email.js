var connection = require('../middelware/mysqlConnection');
const { v4: uuidv4 } = require('uuid');
var nodemailer = require('nodemailer');
require('dotenv').config()


exports.postEmail = (req, res, next) => {
    const { name, email, phone, subject, message } = req.body;
    const utilisateur = {
        uuid: connection.escape(uuidv4()),
        name: connection.escape(name),
        email: connection.escape(email),
        phone: connection.escape(phone),
        subject: connection.escape(subject),
        message: connection.escape(message)
    };

    $Sql = `INSERT INTO user_email(uuid, name, email, phone, subject, message) VALUES(${utilisateur.uuid}, ${utilisateur.name}, ${utilisateur.email}, ${utilisateur.phone}, ${utilisateur.subject}, ${utilisateur.message})`;
    connection.query($Sql, (error, results, fiedls) => {
        if (error) { return res.status(401).json({ message: `An error has occurred: ${error}` }) }
        else { 
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.USEREMAIL,
                    pass: process.env.PASSWORDUSEREMAIL
                }
            });

            var mailOptions = {
                from: utilisateur.email,
                to: process.env.USEREMAIL,
                subject: utilisateur.subject,
                text: utilisateur.message + "\n\n" + `Submiter: ${utilisateur.email}`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

            return res.status(201).json({ message: "Your email has been sent"})
        }
    })
}


exports.getAllEmail = (req, res, next) => {
    $Sql = `SELECT uuid,admin FROM users WHERE uuid = '${req.auth.userId}' `;
    connection.query($Sql, (error, result, fields) => {
        if (error) { return res.status(401).json({ message: `An error has occurred: ${error}` }) }
        else if (result === 0) { return res.status(401).json({ message: 'Unknow User' }) }
        else {
            $Sql = "SELECT * FROM user_email";
            connection.query($Sql, (error, results, fields) => {
                if (error) { return res.status(401).json({ message: `An error has occurred: ${error}` }) }
                else { return res.status(201).json(results) }
            })
        }
    })
}

exports.DeleteEmail = (req, res, next) => {
    $Sql = `SELECT uuid,admin FROM users WHERE uuid = '${req.auth.userId}' `;
    connection.query($Sql, (error, results, fields) => {
        if (error) { return res.status(401).json({ message: `An error has occurred: ${error}` }) }
        else if (results === 0) { return res.status(401).json({ message: 'Unknow User' }) }
        else {
            const ResultAdmin = results.map(results => results.admin);
            if (ResultAdmin == process.env.ADMINID) {
                $Sql = `SELECT * FROM user_email WHERE uuid = '${req.params.id}' `;
                connection.query($Sql, (error, results, fields) => {
                    if (error) { return res.status(401).json({ message: `An error has occurred: ${error}` }) }
                    else if (results == 0) { return res.status(401).json({ message: 'Unknow email' }) }
                    else {
                        $Sql = `DELETE FROM user_email WHERE uuid = '${req.params.id}'`;
                        connection.query($Sql, (error, results, fields) => {
                            if (error) { return res.status(401).json({ message: `An error has occurred: ${error}` }) }
                            else { return res.status(401).json({ message: "the email has been successfully deleted"}) }
                        })
                    }
                })
            } else {
                return res.status(401).json({ message: "You are not authorized to do this action" });
            }
        }
    })
}

exports.addEmailNewLester = (req, res, next) => {
    const { email } = req.body;
    const newEmail = {
        uuid: connection.escape(uuidv4()),
        email : connection.escape(email)
    };
    console.log(newEmail.uuid)
    $Sql = `INSERT INTO news_lester(uuid, email) VALUES (${newEmail.uuid}, ${newEmail.email})`;
    connection.query($Sql, (err, results, fields) => {
        if(err) { return res.status(401).json({message: "You are already registered"}) }
        else { return res.status(201).json({message: 'Your registration has been registered'}) }
    })

}