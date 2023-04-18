const Joi = require('joi');

const schema = Joi.object({
  uuid_conversation: Joi.string().uuid({ version: 'uuidv4' }).required(),
  uuid_project: Joi.string().uuid({ version: 'uuidv4' }).required(),
  commentaire: Joi.string().trim().allow('').max(500)
});
const ValidCommentaireSchema = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) { return res.status(400).send({ message: error.details[0].message }); }
    else { next(); }
}
module.exports = ValidCommentaireSchema;