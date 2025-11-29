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

comValidator.companyCreationRules = function() {}

comValidator.companyUpdateRules = function() {}

module.exports = comValidator;