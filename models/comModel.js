const { client, ObjectId } = require("../database/");
const database = client.db("");
const collect = database.collection("companies");
const comModel = {};

comModel.getAllCompanies = async function () {}

comModel.getCompanyById = async function (com_id) {}

comModel.createCompany = async function () {}

comModel.updateCompany = async function (com_id) {}

comModel.deleteCompany = async function (com_id) {
    // Convert the com_id string into an ObjectId
    const cid = new ObjectId(com_id);

    // Delete the document in the collection
    const result = await collect.deleteOne({ _id: cid });

    // Return the status of the operation
    if (result.acknowledged && result.deletedCount)
        return [200, "Company Deleted"];
    else if (result.acknowledged)
        return [400, "No Company with that ID to Delete"];
    else
        return [500, "Database Error"];
}

module.exports = comModel;