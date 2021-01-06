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
    Car_registration: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessages),
    Camera_id: Joi.number()
        .allow("")
        .error(errMessages),
    time: Joi.string()
        .required()
        .min(2)
        .max(60)
        .error(errMessages),
    authorized: Joi.string()
        .optional()
        .allow("")
        .min(1)
        .max(1)
        .error(errMessages),
    direction: Joi.string()
        .optional()
        .allow("")
        .min(1)
        .max(1)
        .error(errMessages),
});


module.exports = vehSchema;