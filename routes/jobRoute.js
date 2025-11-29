const express = require("express");
const { requiresAuth } = require("express-openid-connect");
const jobRouter = new express.Router();
const jobValidator = require("../utilities/jobValidator");
const comValidator = require("../utilities/comValidator");
const jobController = require("../controllers/jobController");

// Route to GET all job postings
jobRouter.get(
    "/all",
    jobController.getAllJobPostings
)

// Route to GET one job posting by Job Posting ID
jobRouter.get(
    "/:job_id",
    jobValidator.jobPostingIdRulesIdRules(),
    jobController.getJobPostingById
)

// Route to GET one job posting by Company ID
jobRouter.get(
    "/com/:com_id",
    comValidator.companyIdRules(),
    jobController.getJobPostingsByCompanyId
)

// Route to POST the creation of a new job posting
jobRouter.post(
    "/new",
    jobValidator.jobPostingCreationRulesCreationRules(),
    jobController.createJobPosting
)

// Route to PUT an update to a job posting by ID
jobRouter.put(
    "/:job_id",
    jobValidator.jobPostingIdRulesIdRules(),
    jobValidator.jobPostingUpdateRulesUpdateRules(),
    jobController.updateJobPosting
)

// Route to DELETE a job posting by ID
jobRouter.delete(
    "/:job_id",
    jobValidator.jobPostingIdRulesIdRules(),
    jobController.deleteJobPosting
)

module.exports = jobRouter;