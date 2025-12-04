const express = require("express");
const { requiresAuth } = require("express-openid-connect");
const appRouter = new express.Router();
const appValidator = require("../utilities/appValidator");
const workValidator = require("../utilities/workValidator");
const jobValidator = require("../utilities/jobValidator");
const appController = require("../controllers/appController");

// Route to GET all job applications
appRouter.get(
    "/all",
    appController.getAllApplications
);

// Route to GET a job application by ID
appRouter.get(
    "/:app_id",
    appValidator.applicationIdRules(),
    appController.getApplicationById
);

// Route to GET job applications by Worker ID
appRouter.get(
    "/work/:work_id",
    workValidator.workerIdRules(),
    appController.getApplicationsByWorkerId
);

// Route to GET job applications by Job Posting ID
appRouter.get(
    "/job/:job_id",
    jobValidator.jobPostingIdRules(),
    appController.getApplicationsByJobPostingId
);

// Route to POST a new job application
appRouter.post(
    "/new",
    requiresAuth(),
    appValidator.applicationCreationRules(),
    appController.createApplication
);

// Route to PUT an update to a job application
appRouter.put(
    "/:app_id",
    requiresAuth(),
    appValidator.applicationIdRules(),
    appValidator.applicationUpdateRules(),
    appController.updateApplication
);

// Route to DELETE a job application
appRouter.delete(
    "/:app_id",
    requiresAuth(),
    appValidator.applicationIdRules(),
    appController.deleteApplication
);

module.exports = appRouter;