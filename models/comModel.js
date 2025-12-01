const { client, ObjectId } = require("../database/");
const database = client.db("");
const collect = database.collection("companies");
const comModel = {};

//-------------------------------------------------------------//
// GET all companies
comModel.getAllCompanies = async function () {
  try {
    const companies = await collect.find().toArray();
    return [200, companies];
  } catch (err) {
    return [500, "Database Error"];
  }
};

// GET one company by ID
comModel.getCompanyById = async function (com_id) {
  try {
    const cid = new ObjectId(com_id);
    const company = await collect.findOne({ _id: cid });
    if (!company) return [404, "No Company with that ID"];
    return [200, company];
  } catch (err) {
    return [500, "Database Error"];
  }
};
//----------------------------------------------------------------//

comModel.createCompany = async function (com_doc) {
    // Insert the document into the collection
    const result = await collect.insertOne(com_doc);

    // Return the status of the operation
    if (result.acknowledged)
        return [200, "Company Created"];
    else
        return [500, "Database Error"];
}
//-------------------------//
comModel.updateCompany = async function (com_id, com_doc) {
    // Convert the com_id string into an ObjectId
    const cid = new ObjectId(com_id);

    // Update the document in the collection
    const result = await collect.updateOne(
        { _id: cid },
        { $set: com_doc }
    );

    // Return the status of the operation
    if (result.acknowledged && result.matchedCount) {
        return [200, "Company Updated"];
    } else if (result.acknowledged) {
        return [404, "No Company with that ID to Update"];
    } else {
        return [500, "Database Error"];
    }
};
//-------------------------------//

comModel.deleteCompany = async function (com_id) {
    // Convert the com_id string into an ObjectId
    const cid = new ObjectId(com_id);

    // Delete the document in the collection
    const result = await collect.deleteOne({ _id: cid });

    // Return the status of the operation
    if (result.acknowledged && result.deletedCount)
        return [200, "Company Deleted"];
    else if (result.acknowledged)
        return [404, "No Company with that ID to Delete"];
    else
        return [500, "Database Error"];
}




module.exports = comModel;