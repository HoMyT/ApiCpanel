const Joi = require('joi');

const schema = Joi.object({
    id: Joi.number().integer().required(),
    uuid: Joi.string().uuid({ version: 'uuidv4' }).required(),
    pathImg: Joi.string().uri().required(),
    uuid: Joi.string().pattern(/^[0-9a-fA-F]{32}$/).required()
  });

const pathImg = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) { return res.status(400).send({ message: error.details[0].message }); }
    else { next(); }
}
module.exports = pathImg;