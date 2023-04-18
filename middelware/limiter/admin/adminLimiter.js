const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // temps de la p�riode de limitation (ici 1 heure)
    max: 100, // nombre maximal de requ�tes autoris�es pendant la p�riode
    message: "Too many requests from this IP, please try again later", // message d'erreur affich� en cas de d�passement de la limite
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
});

module.exports = limiter;