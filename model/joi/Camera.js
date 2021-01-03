const Joi = require('joi');

const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = "Pole jest wymagane";
                break;
            case "string.min":
                err.message = `Pole powinno zawierać co najmniej ${err.local.limit} znaki`;
                break;
            case "string.max":
                err.message = `Pole powinno zawierać co najwyżej ${err.local.limit} znaki`;
                break;
                break;
            default:
                break;
        }
    });
    return errors;
}

const camSchema = Joi.object({
    id: Joi.number()
        .optional()
        .allow(""),
    alias: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessages),
    location: Joi.string()
        .min(2)
        .max(60)
        .error(errMessages),
    manufacturer: Joi.string()
        .min(2)
        .max(60)
        .error(errMessages),
    resolution: Joi.string()
        .optional()
        .min(2)
        .max(60)
        .error(errMessages)
});



module.exports = camSchema;