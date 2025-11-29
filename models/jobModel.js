const { client, ObjectId } = require("../database/");
const database = client.db("");
const collect = database.collection("job_postings");
const jobModel = {};

jobModel.getAllJobPostings = async function () {}

jobModel.getJobPostingById = async function (job_id) {}

jobModel.getJobPostingsByCompanyId = async function (com_id) {}

jobModel.createJobPosting = async function () {}

jobModel.updateJobPosting = async function (job_id) {}

jobModel.deleteJobPosting = async function (job_id) {}

module.exports = jobModel;