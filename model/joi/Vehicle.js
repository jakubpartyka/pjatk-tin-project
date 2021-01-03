const Joi = require('joi');

const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = "Pole jest wymagane";
                break;
            case "any.required":
                err.message = "Pole jest wymagane";
                break;
            case "string.min":
                err.message = `Pole powinno zawierać co najmniej ${err.local.limit} znaki`;
                break;
            case "string.max":
                err.message = `Pole powinno zawierać co najwyżej ${err.local.limit} znaki`;
                break;
            default:
                console.log(err.code);
                break;
        }
    });
    return errors;
}

const vehSchema = Joi.object({
    id: Joi.string()
        .optional()
        .allow(""),
    registration: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessages),
    type: Joi.string()
        .optional()
        .allow("")
        .min(2)
        .max(60)
        .error(errMessages),
    color: Joi.string()
        .optional()
        .allow("")
        .min(2)
        .max(60)
        .error(errMessages),
});


module.exports = vehSchema;