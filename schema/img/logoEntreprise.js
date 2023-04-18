const Joi = require('joi');

const schema = Joi.object({
  pathImg: Joi.string().valid(Joi.ref('$pathImg')).required()
});

const ValidImgEntreprise = (req, res, next) => {
    const { error } = schema.validate(req.file, {context: {$pathImg: req.body.pathImg}});
    if (error) { 
        return res.status(400).send({ message: error.details[0].message }); 
    } else { 
        next(); 
    }
};

module.exports = ValidImgEntreprise;
