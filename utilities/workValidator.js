const { body, param } = require("express-validator");
const workValidator = {};

workValidator.workerIdRules = function() {
    return [
        param("work_id")
            .trim()
            .escape()
            .notEmpty()
            .isMongoId()
            .withMessage("An id is required and must be a valid MongoDB ObjectId.")
    ];
}

workValidator.workerCreationRules = function() {
    return [
        body("first_name")
            .trim()
            .escape()
            .notEmpty()
            .isString()
            .withMessage("A first name is required and must be a string."),
        body("last_name")
            .trim()
            .escape()
            .notEmpty()
            .isString()
            .withMessage("A last name is required and must be a string."),
        body("address")
            .trim()
            .escape()
            .notEmpty()
            .isString()
            .withMessage("An address is required and must be a string."),
        body("email")
            .trim()
            .escape()
            .notEmpty()
            .isEmail()
            .withMessage("An email is requied and must be a valid email."),
        body("phone")
            .isInt()
            .withMessage("A phone number is required and must be an integer.")
    ];
}

//----------------------------------------------------------------------//
workValidator.workerUpdateRules = function() {
    return [
        body("first_name")
            .optional()
            .trim()
            .escape()
            .isString()
            .withMessage("First name must be a string."),
        body("last_name")
            .optional()
            .trim()
            .escape()
            .isString()
            .withMessage("Last name must be a string."),
        body("address")
            .optional()
            .trim()
            .escape()
            .isString()
            .withMessage("Address must be a string."),
        body("email")
            .optional()
            .trim()
            .escape()
            .isEmail()
            .withMessage("Email must be valid."),
        body("phone")
            .optional()
            .isInt()
            .withMessage("Phone number must be an integer.")
    ];
};
//------------------------------------------------------------------------//

module.exports = workValidator;