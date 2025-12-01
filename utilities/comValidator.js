const { body, param } = require("express-validator");
const comValidator = {};

comValidator.companyIdRules = function() {
    return [
        param("com_id")
            .trim()
            .escape()
            .notEmpty()
            .isMongoId()
            .withMessage("An id is required and must be a valid MongoDB ObjectId.")
    ];
}

comValidator.companyCreationRules = function() {
    return [
        body("name")
            .trim()
            .escape()
            .notEmpty()
            .isString()
            .withMessage("A name is required and must be a string."),
        body("address")
            .trim()
            .escape()
            .notEmpty()
            .isString()
            .withMessage("An address is required and must be a string."),
        body("type")
            .trim()
            .escape()
            .notEmpty()
            .isString()
            .withMessage("A business type is requied and must be a string.")
    ];
}

comValidator.companyUpdateRules = function() {
    return [
        body("name")
            .optional({ values: null })
            .trim()
            .escape()
            .notEmpty()
            .isString()
            .withMessage("Name must be a string."),
        body("address")
            .optional({ values: null })
            .trim()
            .escape()
            .notEmpty()
            .isString()
            .withMessage("Address must be a string."),
        body("type")
            .optional({ values: null })
            .trim()
            .escape()
            .notEmpty()
            .isString()
            .withMessage("Business type must be a string.")
    ];
}

module.exports = comValidator;