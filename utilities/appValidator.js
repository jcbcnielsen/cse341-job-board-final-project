const { body, param } = require("express-validator");
const appValidator = {};

appValidator.applicationIdRules = function() {
    return [
        param("app_id")
            .trim()
            .escape()
            .notEmpty()
            .isMongoId()
            .withMessage("An id is required and must be a valid MongoDB ObjectId.")
    ];
}

appValidator.applicationCreationRules = function() {
    return [
        body("work_id")
            .trim()
            .escape()
            .notEmpty()
            .isMongoId()
            .withMessage("A worker id is required and must be a valid MongoDB ObjectId."),
        body("job_id")
            .trim()
            .escape()
            .notEmpty()
            .isMongoId()
            .withMessage("A job posting id is required and must be a valid MongoDB ObjectId."),
        body("submitted_date")
            .optional({ values: null })
            .trim()
            .escape()
            .notEmpty()
            .isString()
            .isISO8601()
            .withMessage(`Dates must be strings in ISO 8601 "YYYY-MM-DD" format. If a date is not included, the submission time will be used as the submitted date.`),
        body("resume_filename")
            .trim()
            .escape()
            .notEmpty()
            .isString()
            .matches(/\w+\x2epdf|\w+\x2edocx|\w+\x2edoc|\w+\x2eodt/)
            .withMessage(`A resume filename is required and must be a string using only alphanumeric characters and ending with either ".pdf" ".docx" ".doc" or ".odt"`)
    ];
}
//-------------------------------------------------------------//
appValidator.applicationUpdateRules = function() {
    return [
        body("work_id")
            .optional()
            .trim()
            .escape()
            .isMongoId()
            .withMessage("work_id must be a valid MongoDB ObjectId."),
        body("job_id")
            .optional()
            .trim()
            .escape()
            .isMongoId()
            .withMessage("job_id must be a valid MongoDB ObjectId."),
        body("submitted_date")
            .optional()
            .trim()
            .escape()
            .isISO8601()
            .withMessage("submitted_date must be in ISO 8601 format."),
        body("resume_filename")
            .optional()
            .trim()
            .escape()
            .isString()
            .matches(/\w+\.(pdf|docx|doc|odt)$/)
            .withMessage("resume_filename must end with '.pdf', '.docx', '.doc' or '.odt'.")
    ];
};
//------------------------------------------------------------------------//
module.exports = appValidator;