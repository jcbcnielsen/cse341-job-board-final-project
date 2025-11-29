const { validationResult } = require("express-validator");
const jobModel = require("../models/jobModel");
const jobController = {};

jobController.getAllJobPostings = async function (req, res) {}

jobController.getJobPostingById = async function (req, res) {}

jobController.getJobPostingsByCompanyId = async function (req, res) {}

jobController.createJobPosting = async function (req, res) {}

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