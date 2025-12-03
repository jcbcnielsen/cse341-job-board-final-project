const { validationResult } = require("express-validator");
const appModel = require("../models/appModel");
const appController = {};

appController.getAllApplications = async function (req, res) {}

appController.getApplicationById = async function (req, res) {}

appController.getApplicationByWorkerId = async function (req, res) {}

appController.getApplicationByJobPostingId = async function (req, res) {}

appController.createApplication = async function (req, res) {}

appController.updateApplication = async function (req, res) {}

appController.deleteApplication = async function (req, res) {}

module.exports = appController;