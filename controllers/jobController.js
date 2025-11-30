const { validationResult } = require("express-validator");
const jobModel = require("../models/jobModel");
const jobController = {};

jobController.getAllJobPostings = async function (req, res) {}

jobController.getJobPostingById = async function (req, res) {}

jobController.getJobPostingsByCompanyId = async function (req, res) {}

jobController.createJobPosting = async function (req, res) {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new Error(errors.toString());
        }

        // Create the document object to send to the model
        const dateObj = new Date();
        const dateString = dateObj.toISOString().slice(0, 10); // YYYY-MM-DD
        const job_doc = {
            title: req.body.title,
            description: req.body.description,
            company_id: req.body.company_id,
            location: req.body.location,
            posted_date: req.body.posted_date || dateString,
            salary_range: req.body.salary_range,
            employment_type: req.body.employment_type,
            requirements: req.body.requirements
        };

        // Send the document to the model for database interaction
        const result = await jobModel.createJobPosting(job_doc);

        // Deliver result to the user
        res.status(result[0]).send(result[1]);
        
    } catch (error) {
        res.status(400).send(error);
    }
}

jobController.updateJobPosting = async function (req, res) {}

jobController.deleteJobPosting = async function (req, res) {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new Error(errors.toString());
        }

        // Send id to the model for database interaction
        const result = await jobModel.deleteJobPosting(req.params.job_id);

        // Deliver result to the user
        res.status(result[0]).send(result[1]);
        
    } catch (error) {
        res.status(400).send(error);
    }
}

module.exports = jobController;