const jsonWebToken = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    if (!req.headers.authorization) { return res.status(401).json({message: 'No token active', IsTrue: false})}
        const token = req.headers.authorization.split(' ')[1];
        jsonWebToken.verify(JSON.parse(token), process.env.PASSTOKEN, (err, decode) => {
            if (err) { return res.status(401).json({ message: 'jwt not active', IsTrue: false }) }
            
            else {
                const userId = decode.uuid[0];
                req.auth = { userId };
                next();
            }
        });
};
