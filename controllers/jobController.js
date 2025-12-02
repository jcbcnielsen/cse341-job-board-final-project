const { validationResult } = require("express-validator");
const jobModel = require("../models/jobModel");
const jobController = {};

//----------------------------------------------------------//
// GET all job postings
jobController.getAllJobPostings = async function (req, res) {
  try {
    const result = await jobModel.getAllJobPostings();
    res.status(result[0]).send(result[1]);
  } catch (error) {
    res.status(500).send(error.message || error);
  }
};

// GET one job posting by ID
jobController.getJobPostingById = async function (req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let errorString = "";
        errors.array().forEach((err) => {
            errorString += `${err.msg} `;
        });
        throw new Error(errorString);
    }

    const result = await jobModel.getJobPostingById(req.params.job_id);
    res.status(result[0]).send(result[1]);
  } catch (error) {
    res.status(400).send(error.message || error);
  }
};

// GET job postings by Company ID
jobController.getJobPostingsByCompanyId = async function (req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let errorString = "";
        errors.array().forEach((err) => {
            errorString += `${err.msg} `;
        });
        throw new Error(errorString);
    }

    const result = await jobModel.getJobPostingsByCompanyId(req.params.com_id);
    res.status(result[0]).send(result[1]);
  } catch (error) {
    res.status(400).send(error.message || error);
  }
};
//------------------------------------------------------------------//

jobController.createJobPosting = async function (req, res) {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let errorString = "";
            errors.array().forEach((err) => {
                errorString += `${err.msg} `;
            });
            throw new Error(errorString);
        }

        // Ensure the request body contains a posted_date
        if (req.body.posted_date == null) {
            const date = new Date();
            req.body.posted_date = date.toISOString().slice(0, 10); // YYYY-MM-DD
        }

        // Send the document to the model for database interaction
        const result = await jobModel.createJobPosting(req.body);

        // Deliver result to the user
        res.status(result[0]).send(result[1]);
        
    } catch (error) {
        res.status(400).send(error);
    }
}
//--------------------------------------------------------------------------//
jobController.updateJobPosting = async function (req, res) {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let errorString = "";
            errors.array().forEach((err) => {
                errorString += `${err.msg} `;
            });
            throw new Error(errorString);
        }

        // Send id and update data to the model
        const result = await jobModel.updateJobPosting(req.params.job_id, req.body);

        // Deliver result to the user
        res.status(result[0]).send(result[1]);

    } catch (error) {
        res.status(400).send(error.message || error);
    }
};
//-------------------------------------------------------------------------//

jobController.deleteJobPosting = async function (req, res) {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let errorString = "";
            errors.array().forEach((err) => {
                errorString += `${err.msg} `;
            });
            throw new Error(errorString);
        }

        // Send id to the model for database interaction
        const result = await jobModel.deleteJobPosting(req.params.job_id);

        // Deliver result to the user
        res.status(result[0]).send(result[1]);
        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = jobController;