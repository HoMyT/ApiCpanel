const Joi = require('joi');

const userInscriptionSchema = Joi.object({
    name: Joi.string().alphanum().min(5).max(50).required(),
    email: Joi.string().email().required(),
    phone : Joi.number().integer(),
    subject: Joi.string().alphanum().min(5).max(50).required(),
    message: Joi.string().regex(/^[\w\s]+$/),
})

const valideUser = (req, res, next) => {
    const { error } = userInscriptionSchema.validate(req.body);
    if (error) { return res.status(400).send({ message: error.details[0].message }); }
    else { next(); }
}
module.exports = valideUser;