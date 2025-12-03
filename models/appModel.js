const { client, ObjectId } = require("../database/");
const database = client.db("");
const collect = database.collection("applications");
const appModel = {};

appModel.getAllApplications = async function () {}

appModel.getApplicationById = async function (app_id) {}

appModel.getApplicationByWorkerId = async function (work_id) {}

appModel.getApplicationByJobPostingId = async function (job_id) {}

appModel.createApplication = async function (app_doc) {}

appModel.updateApplication = async function (app_id, app_doc) {}

appModel.deleteApplication = async function (app_id) {}

module.exports = appModel;