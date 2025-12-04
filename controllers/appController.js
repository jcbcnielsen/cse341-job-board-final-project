const { validationResult } = require("express-validator");
const appModel = require("../models/appModel");
const appController = {};

appController.getAllApplications = async function (req, res) {
    try {
        // Get the job applications data from the model
        const result = await appModel.getAllApplications();

        // Deliver the result to the user
        res.status(result[0]).send(result[1]);

    } catch (error) {
        res.status(500).send(error.message);
    }
}

appController.getApplicationById = async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let errorString = "";
            errors.array().forEach((err) => {
                errorString += `${err.msg} `;
            });
            throw new Error(errorString);
        }

        // Send the application id to the model for database interaction
        const result = await appModel.getApplicationById(req.params.app_id);

        // Deliver the result to the user
        res.status(result[0]).send(result[1]);

    } catch (error) {
        res.status(400).send(error.message);
    }
}

appController.getApplicationsByWorkerId = async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let errorString = "";
            errors.array().forEach((err) => {
                errorString += `${err.msg} `;
            });
            throw new Error(errorString);
        }

        // Send the worker id to the model for database interaction
        const result = await appModel.getApplicationsByWorkerId(req.params.work_id);

        // Deliver the result to the user
        res.status(result[0]).send(result[1]);

    } catch (error) {
        res.status(400).send(error.message);
    }
}

appController.getApplicationsByJobPostingId = async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let errorString = "";
            errors.array().forEach((err) => {
                errorString += `${err.msg} `;
            });
            throw new Error(errorString);
        }

        // Send the job posting id to the model for database interaction
        const result = await appModel.getApplicationsByJobPostingId(req.params.job_id);

        // Deliver the result to the user
        res.status(result[0]).send(result[1]);

    } catch (error) {
        res.status(400).send(error.message);
    }
}

appController.createApplication = async function (req, res) {
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
    
            // Ensure the request body contains a submitted_date
            if (req.body.submitted_date == null) {
                const date = new Date();
                req.body.submitted_date = date.toISOString().slice(0, 10); // YYYY-MM-DD
            }
    
            // Send the document to the model for database interaction
            const result = await appModel.createApplication(req.body);
    
            // Deliver result to the user
            res.status(result[0]).send(result[1]);
            
        } catch (error) {
            res.status(400).send(error.message);
        }
}
//--------------------------------------------------------------------------//
appController.updateApplication = async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let errorString = "";
            errors.array().forEach((err) => {
                errorString += `${err.msg} `;
            });
            throw new Error(errorString);
        }

        const result = await appModel.updateApplication(req.params.app_id, req.body);
        res.status(result[0]).send(result[1]);
    } catch (error) {
        res.status(400).send(error.message);
    }
};


appController.deleteApplication = async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let errorString = "";
            errors.array().forEach((err) => {
                errorString += `${err.msg} `;
            });
            throw new Error(errorString);
        }

        const result = await appModel.deleteApplication(req.params.app_id);
        res.status(result[0]).send(result[1]);
    } catch (error) {
        res.status(400).send(error.message);
    }
};
//------------------------------------------------------------------------------//

module.exports = appController;