const { client, ObjectId } = require("../database/");
const database = client.db("");
const collect = database.collection("workers");
const workModel = {};

workModel.getAllWorkers = async function () {}

workModel.getWorkerById = async function (work_id) {}

workModel.createWorker = async function (work_doc) {}

workModel.updateWorker = async function (work_id, work_doc) {}

workModel.deleteWorker = async function (work_id) {}

module.exports = workModel;