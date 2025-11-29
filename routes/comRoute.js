const express = require("express");
const { requiresAuth } = require("express-openid-connect");
const comRouter = new express.Router();
const comValidator = require("../utilities/comValidator");
const comController = require("../controllers/comController");


// Route to GET all companies
comRouter.get(
    "/all",
    comController.getAllCompanies
)

// Route to GET one company by ID
comRouter.get(
    "/:com_id",
    comValidator.companyIdRules(),
    comController.getCompanyById
)

// Route to POST the creation of a new company
comRouter.post(
    "/new",
    comValidator.companyCreationRules(),
    comController.createCompany
)

// Route to PUT an update to a compnay by ID
comRouter.put(
    "/:com_id",
    comValidator.companyIdRules(),
    comValidator.companyUpdateRules(),
    comController.updateCompany
)

// Route to DELETE a company by ID
comRouter.delete(
    "/:com_id",
    comValidator.companyIdRules(),
    comController.deleteCompany
)

module.exports = comRouter;