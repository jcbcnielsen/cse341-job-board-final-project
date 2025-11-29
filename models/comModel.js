const { client, ObjectId } = require("../database/");
const database = client.db("");
const collect = database.collection("companies");
const comModel = {};

comModel.getAllCompanies = async function () {}

comModel.getCompanyById = async function (com_id) {}

comModel.createCompany = async function () {}

comModel.updateCompany = async function (com_id) {}

comModel.deleteCompany = async function (com_id) {}

module.exports = comModel;