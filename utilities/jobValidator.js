const { body, param } = require("express-validator");
const jobValidator = {};

jobValidator.jobPostingIdRules = function() {
    return [
        param("job_id")
            .exists()
            .trim()
            .escape()
            .notEmpty()
            .isMongoId()
            .withMessage("An id is required and must be a valid MongoDB ObjectId.")
    ];
}

jobValidator.jobPostingCreationRules = function() {
    return [
        body("title")
            .exists()
            .trim()
            .escape()
            .notEmpty()
            .isString()
            .withMessage("A job title is required and must be a string."),
        body("description")
            .exists()
            .trim()
            .escape()
            .notEmpty()
            .isString()
            .withMessage("A job description is required and must be a string."),
        body("company_id")
            .exists()
            .trim()
            .escape()
            .notEmpty()
            .isMongoId()
            .withMessage("A company id is required and must be a valid MongoDB ObjectId."),
        body("location")
            .exists()
            .trim()
            .escape()
            .notEmpty()
            .isString()
            .withMessage("A job location is required and must be a string."),
        body("posted_date")
            .optional({ values: null })
            .trim()
            .escape()
            .notEmpty()
            .isString()
            .isISO8601()
            .withMessage(`Dates must be strings in ISO 8601 "YYYY-MM-DD" format.
                If a date is not included, the submission time will be used as the posted date.`),
        body("salary_range")
            .exists()
            .isObject()
            .withMessage("A salary range is required and must be a JavaScript Object."),
        body("salary_range.min")
            .exists()
            .isFloat({ min: 0.01 })
            .withMessage("A minimum salary in the salary range is required and must be a positive number."),
        body("salary_range.max")
            .exists()
            .isFloat({ min: 0.01 })
            .withMessage("A maximum salary in the salary range is required and must be a positive number."),
        body("employment_type")
            .exists()
            .trim()
            .escape()
            .notEmpty()
            .isString()
            .custom((value) => {
                return (value == "Part-Time Hourly"
                    || value == "Full-Time Hourly"
                    || value == "Full-Time Salaried"
                    || value == "Temporary"
                    || value == "Seasonal"
                    || value == "Internship");
            })
            .withMessage(`An employment type is required and must be either
                "Part-Time Hourly" "Full-Time Hourly" "Full-Time Salaried"
                "Temporary" "Seasonal" or "Internship"`),
        body("requirements")
            .exists()
            .isArray({ min: 1 })
            .withMessage("A list of requirements is required."),
        body("requirements.*")
            .trim()
            .escape()
            .notEmpty()
            .isString()
            .withMessage("Each requirement must be a string.")
    ];
}

jobValidator.jobPostingUpdateRules = function() {}

module.exports = jobValidator;