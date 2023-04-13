const Joi = require('joi');

const userInscriptionSchema = Joi.object({
    email: Joi.string().email().required()
})

const valideUser = (req, res, next) => {
    const { error } = userInscriptionSchema.validate(req.body);
    if (error) { return res.status(400).send({ message: error.details[0].message }); }
    else { next(); }
}
module.exports = valideUser;