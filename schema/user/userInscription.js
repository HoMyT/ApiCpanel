const Joi = require('joi');

const userInscriptionSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(), 
    name: Joi.string().min(3).max(50).required(),
    last_name: Joi.string().min(3).max(50).required()
})

const valideUser = (req, res, next) => {
    const { error } = userInscriptionSchema.validate(req.body);
    if (error) { return res.status(400).send({ message: error.details[0].message }); }
    else { next(); }
}
module.exports = valideUser;