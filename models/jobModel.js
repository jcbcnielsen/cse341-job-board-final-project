const { client, ObjectId } = require("../database/");
const database = client.db("");
const collect = database.collection("job_postings");
const jobModel = {};

//----------------------------------------------------------//
// GET all job postings
jobModel.getAllJobPostings = async function () {
  try {
    const jobs = await collect.find().toArray();
    return [200, jobs];
  } catch (err) {
    return [500, "Database Error"];
  }
};

// GET one job posting by ID
jobModel.getJobPostingById = async function (job_id) {
  try {
    const jid = new ObjectId(job_id);
    const job = await collect.findOne({ _id: jid });
    if (!job) return [404, "No Job Posting with that ID"];
    return [200, job];
  } catch (err) {
    return [500, "Database Error"];
  }
};

// GET job postings by Company ID
jobModel.getJobPostingsByCompanyId = async function (com_id) {
  try {
    const cid = new ObjectId(com_id);
    const jobs = await collect.find({ company_id: cid }).toArray();
    return [200, jobs];
  } catch (err) {
    return [500, "Database Error"];
  }
};
//----------------------------------------------------------------//

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
//--------------------------------------------------------// 

jobModel.updateJobPosting = async function (job_id, job_doc) {
    // Convert the job_id string into an ObjectId
    const jid = new ObjectId(job_id);

    // Update the document in the collection
    const result = await collect.updateOne(
        { _id: jid },
        { $set: job_doc }
    );

    // Return the status of the operation
    if (result.acknowledged && result.matchedCount) {
        return [200, "Job Posting Updated"];
    } else if (result.acknowledged) {
        return [404, "No Job Posting with that ID to Update"];
    } else {
        return [500, "Database Error"];
    }
};
//-------------------------------------------------------//

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