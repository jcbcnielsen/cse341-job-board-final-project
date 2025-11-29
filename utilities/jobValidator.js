const { body, param } = require("express-validator");
const jobValidator = {};

jobValidator.jobPostingIdRules = function() {
    return [
        param("job_id")
            .trim()
            .escape()
            .notEmpty()
            .isMongoId()
            .withMessage("An id is required and must be a valid MongoDB ObjectId.")
    ];
}

jobValidator.jobPostingCreationRules = function() {}

jobValidator.jobPostingUpdateRules = function() {}

module.exports = jobValidator;