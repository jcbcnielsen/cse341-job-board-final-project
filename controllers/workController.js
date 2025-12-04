const { validationResult } = require("express-validator");
const workModel = require("../models/workModel");
const workController = {};

workController.getAllWorkers = async function (req, res) {
    try {
        // Get the workers data from the model
        const result = await workModel.getAllWorkers();

        // Deliver the result to the user
        res.status(result[0]).send(result[1]);

    } catch (error) {
        res.status(500).send(error.message);
    }
}

workController.getWorkerById = async function (req, res) {
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
        const result = await workModel.getWorkerById(req.params.work_id);

        // Deliver the result to the user
        res.status(result[0]).send(result[1]);

    } catch (error) {
        res.status(400).send(error.message);
    }
}

workController.createWorker = async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let errorString = "";
            errors.array().forEach((err) => {
                errorString += `${err.msg} `;
            });
            throw new Error(errorString);
        }

        // Send the worker document to the model for database interaction
        const result = await workModel.createWorker(req.body);

        // Deliver the result to the user
        res.status(result[0]).send(result[1]);
        
    } catch (error) {
        res.status(400).send(error.message);
    }
}
//------------------------------------------------------------------//
workController.updateWorker = async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let errorString = "";
            errors.array().forEach((err) => {
                errorString += `${err.msg} `;
            });
            throw new Error(errorString);
        }

        const result = await workModel.updateWorker(req.params.work_id, req.body);
        res.status(result[0]).send(result[1]);
    } catch (error) {
        res.status(400).send(error.message);
    }
};


workController.deleteWorker = async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let errorString = "";
            errors.array().forEach((err) => {
                errorString += `${err.msg} `;
            });
            throw new Error(errorString);
        }

        const result = await workModel.deleteWorker(req.params.work_id);
        res.status(result[0]).send(result[1]);
    } catch (error) {
        res.status(400).send(error.message);
    }
};
//---------------------------------------------------------------------//

module.exports = workController;