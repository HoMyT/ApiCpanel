const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // temps de la période de limitation (ici 1 heure)
    max: 5, // nombre maximal de requêtes autorisées pendant la période
    message: "Too many requests from this IP, please try again later", // message d'erreur affiché en cas de dépassement de la limite
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
});

module.exports = limiter;