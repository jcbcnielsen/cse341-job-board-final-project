const { body, param } = require("express-validator");
const comValidator = {};

comValidator.companyIdRules = function() {
    return [
        param("com_id")
            .exists()
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
            .exists()
            .trim()
            .escape()
            .notEmpty()
            .isString()
            .withMessage("A name is required and must be a string."),
        body("address")
            .exists()
            .trim()
            .escape()
            .notEmpty()
            .isString()
            .withMessage("An address is required and must be a string."),
        body("type")
            .exists()
            .trim()
            .escape()
            .notEmpty()
            .isString()
            .withMessage("A business type is requied and must be a string.")
    ];
}

comValidator.companyUpdateRules = function() {}

module.exports = comValidator;