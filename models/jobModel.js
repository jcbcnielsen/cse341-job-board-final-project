const { client, ObjectId } = require("../database/");
const database = client.db("");
const collect = database.collection("job_postings");
const jobModel = {};

jobModel.getAllJobPostings = async function () {}

jobModel.getJobPostingById = async function (job_id) {}

jobModel.getJobPostingsByCompanyId = async function (com_id) {}

jobModel.createJobPosting = async function (job_doc) {
    // Convert the company_id string into an ObjectId
    job_doc.company_id = new ObjectId(job_doc.company_id);

    // Insert the document into the collection
    const result = await collect.insertOne(job_doc);

    // Return the status of the operation
    if (result.acknowledged)
        return [200, "Job Posting Created"];
    else
        return [500, "Database Error"];
}

jobModel.updateJobPosting = async function (job_id) {}

jobModel.deleteJobPosting = async function (job_id) {
    // Convert the job_id string into an ObjectId
    const jid = new ObjectId(job_id);

    // Delete the document in the collection
    const result = await collect.deleteOne({ _id: jid });

    // Return the status of the operation
    if (result.acknowledged && result.deletedCount)
        return [200, "Job Posting Deleted"];
    else if (result.acknowledged)
        return [400, "No Job Posting with that ID to Delete"];
    else
        return [500, "Database Error"];
}

module.exports = jobModel;