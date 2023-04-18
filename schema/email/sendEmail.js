const Joi = require('joi');

const userInscriptionSchema = Joi.object({
    name: Joi.string().regex(/^[\w\s]+$/).required(),
    email: Joi.string().email().required(),
    phone : Joi.number().integer(),
    subject: Joi.string().alphanum().min(5).max(50).required(),
    message: Joi.string().regex(/^[\w\s]+$/).required(),
})

const valideUser = (req, res, next) => {
    const { error } = userInscriptionSchema.validate(req.body);
    if (error) { return res.status(400).send({ message: error.details[0].message }); }
    else { next(); }
}
module.exports = valideUser;