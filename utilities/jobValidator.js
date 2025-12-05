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

jobValidator.jobPostingCreationRules = function() {
    return [
        body("title")
            .trim()
            .escape()
            .notEmpty()
            .isString()
            .withMessage("A job title is required and must be a string."),
        body("description")
            .trim()
            .escape()
            .notEmpty()
            .isString()
            .withMessage("A job description is required and must be a string."),
        body("com_id")
            .trim()
            .escape()
            .notEmpty()
            .isMongoId()
            .withMessage("A company id is required and must be a valid MongoDB ObjectId."),
        body("location")
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
            .withMessage(`Dates must be strings in ISO 8601 "YYYY-MM-DD" format. If a date is not included, the submission time will be used as the posted date.`),
        body("salary_range")
            .isObject()
            .withMessage("A salary range is required and must be a JavaScript Object."),
        body("salary_range.min")
            .isFloat({ min: 0.01 })
            .withMessage("A minimum salary in the salary range is required and must be a positive number."),
        body("salary_range.max")
            .isFloat({ min: 0.01 })
            .withMessage("A maximum salary in the salary range is required and must be a positive number."),
        body("employment_type")
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
            .withMessage(`An employment type is required and must be either "Part-Time Hourly" "Full-Time Hourly" "Full-Time Salaried" "Temporary" "Seasonal" or "Internship"`),
        body("requirements")
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

jobValidator.jobPostingUpdateRules = function() {
    return [
        body("title")
            .optional({ values: null })
            .trim()
            .escape()
            .notEmpty()
            .isString()
            .withMessage("Job title must be a string."),
        body("description")
            .optional({ values: null })
            .trim()
            .escape()
            .notEmpty()
            .isString()
            .withMessage("Job description must be a string."),
        body("com_id")
            .optional({ values: null })
            .trim()
            .escape()
            .notEmpty()
            .isMongoId()
            .withMessage("Company id must be a valid MongoDB ObjectId."),
        body("location")
            .optional({ values: null })
            .trim()
            .escape()
            .notEmpty()
            .isString()
            .withMessage("Job location must be a string."),
        body("posted_date")
            .optional({ values: null })
            .trim()
            .escape()
            .notEmpty()
            .isString()
            .isISO8601()
            .withMessage(`Dates must be strings in ISO 8601 "YYYY-MM-DD" format.`),
        body("salary_range")
            .optional({ values: null })
            .isObject()
            .withMessage("Salary range must be a JavaScript Object."),
        body("salary_range.min")
            .if(body("salary_range").exists())
            .isFloat({ min: 0.01 })
            .withMessage("A minimum salary in the salary range is required if a salary range is included and must be a positive number."),
        body("salary_range.max")
            .if(body("salary_range").exists())
            .isFloat({ min: 0.01 })
            .withMessage("A maximum salary in the salary range is required if a salary range is included and must be a positive number."),
        body("employment_type")
            .optional({ values: null })
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
            .withMessage(`Employment type must be either "Part-Time Hourly" "Full-Time Hourly" "Full-Time Salaried" "Temporary" "Seasonal" or "Internship"`),
        body("requirements")
            .optional({ values: null })
            .isArray({ min: 1 })
            .withMessage("Requirements must be an array."),
        body("requirements.*")
            .trim()
            .escape()
            .notEmpty()
            .isString()
            .withMessage("Each requirement must be a string.")
    ];
}

module.exports = jobValidator;