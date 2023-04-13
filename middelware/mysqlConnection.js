const mysql = require('mysql2');
require('dotenv').config()

var connnection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORDDB,
    database: process.env.DB,
});

connnection.connect(function (err) {
    if (err) {
        console.log(`Error as been occured: ${err}`);
        throw err;
    } else {
        console.log('Connected');
    }
})

module.exports = connnection;