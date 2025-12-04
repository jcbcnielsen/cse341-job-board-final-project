const express = require("express");
const { requiresAuth } = require("express-openid-connect");
const workRouter = new express.Router();
const workValidator = require("../utilities/workValidator");
const workController = require("../controllers/workController");

// Route to GET all workers
workRouter.get(
    "/all",
    workController.getAllWorkers
);

// Route to GET a worker by ID
workRouter.get(
    "/:work_id",
    workValidator.workerIdRules(),
    workController.getWorkerById
);

// Route to POST a new worker
workRouter.post(
    "/new",
    requiresAuth(),
    workValidator.workerCreationRules(),
    workController.createWorker
);

// Route to PUT an update to a worker
workRouter.put(
    "/:work_id",
    requiresAuth(),
    workValidator.workerIdRules(),
    workValidator.workerUpdateRules(),
    workController.updateWorker
);

// Route to DELETE a worker
workRouter.delete(
    "/:work_id",
    requiresAuth(),
    workValidator.workerIdRules(),
    workController.deleteWorker
);

module.exports = workRouter;