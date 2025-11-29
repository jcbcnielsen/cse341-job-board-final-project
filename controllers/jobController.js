const { validationResult } = require("express-validator");
const jobModel = require("../models/jobModel");
const jobController = {};

jobController.getAllJobPostings = async function (req, res) {}

jobController.getJobPostingById = async function (req, res) {}

jobController.getJobPostingsByCompanyId = async function (req, res) {}

jobController.createJobPosting = async function (req, res) {}

jobController.updateJobPosting = async function (req, res) {}

jobController.deleteJobPosting = async function (req, res) {}

module.exports = jobController;