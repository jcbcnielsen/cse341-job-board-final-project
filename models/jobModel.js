const { client, ObjectId } = require("../database/");
const database = client.db("");
const collect = database.collection("job_postings");
const jobModel = {};

jobModel.getAllJobPostings = async function () {}

jobModel.getJobPostingById = async function (job_id) {}

jobModel.getJobPostingsByCompanyId = async function (com_id) {}

jobModel.createJobPosting = async function () {}

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