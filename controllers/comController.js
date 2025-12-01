const { validationResult } = require("express-validator");
const comModel = require("../models/comModel");
const comController = {};

//-----------------------------------------------------------//
// GET all companies
comController.getAllCompanies = async function (req, res) {
  try {
    const result = await comModel.getAllCompanies();
    res.status(result[0]).send(result[1]);
  } catch (error) {
    res.status(500).send(error.message || error);
  }
};

// GET one company by ID
comController.getCompanyById = async function (req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error(errors.toString());
    }

    const result = await comModel.getCompanyById(req.params.com_id);
    res.status(result[0]).send(result[1]);
  } catch (error) {
    res.status(400).send(error.message || error);
  }
};
//---------------------------------------------------------------//

comController.createCompany = async function (req, res) {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new Error(errors.toString());
        }

        // Send the document to the model for database interaction
        const result = await comModel.createCompany(req.body);

        // Deliver result to the user
        res.status(result[0]).send(result[1]);

    } catch (error) {
        res.status(400).send(error);
    }
}
//-----------------------------------------------------------//
comController.updateCompany = async function (req, res) {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new Error(errors.toString());
        }

        // Send id and update data to the model
        const result = await comModel.updateCompany(req.params.com_id, req.body);

        // Deliver result to the user
        res.status(result[0]).send(result[1]);

    } catch (error) {
        res.status(400).send(error.message || error);
    }
};
//--------------------------------------------------------------//
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