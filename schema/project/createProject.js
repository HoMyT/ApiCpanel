const Joi = require('joi');

const schema = Joi.object({
    uuid: Joi.string().uuid({ version: 'uuidv4' }).required(),
    name_project: Joi.string().trim().min(1).required(),
    descriptif_project: Joi.string().trim().min(50).required(),
    type_project: Joi.string().trim().required()
});

const validCreateProject = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) { return res.status(400).send({ message: error.details[0].message }); }
    else { next(); }
}
module.exports = validCreateProject;