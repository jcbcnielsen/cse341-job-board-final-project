const { validationResult } = require("express-validator");
const comModel = require("../models/comModel");
const comController = {};

comController.getAllCompanies = async function (req, res) {}

comController.getCompanyById = async function (req, res) {}

comController.createCompany = async function (req, res) {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new Error(errors.toString());
        }

        // Create the document object to send to the model
        const com_doc = {
            name: req.body.name,
            address: req.body.address,
            type: req.body.type
        };

        // Send the document to the model for database interaction
        const result = await comModel.createCompany(com_doc);

        // Deliver result to the user
        res.status(result[0]).send(result[1]);

    } catch (error) {
        res.status(400).send(error);
    }
}

comController.updateCompany = async function (req, res) {}

comController.deleteCompany = async function (req, res) {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new Error(errors.toString());
        }

        // Send id to the model for database interaction
        const result = await comModel.deleteCompany(req.params.com_id);

        // Deliver result to the user
        res.status(result[0]).send(result[1]);
        
    } catch (error) {
        res.status(400).send(error);
    }
}

module.exports = comController;