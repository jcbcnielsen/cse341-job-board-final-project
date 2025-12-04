const { client, ObjectId } = require("../database/");
const database = client.db("");
const collect = database.collection("applications");
const appModel = {};

appModel.getAllApplications = async function () {
    try {
        // Retrieve the documents from the database
        const applications = await collect.find().toArray();

        // Return the results of the operation
        return [200, applications];

    } catch (error) {
        return [500, "Database Error"];
    }
}

appModel.getApplicationById = async function (app_id) {
    // Convert the app_id string into an ObjectId
    const aid = new ObjectId(app_id);

    // Retrive the document from the database
    const application = await collect.findOne({ _id: aid });

    // Return the results of the operation
    if (application)
        return [200, application];
    else
        return [404, "No application with that ID found."];
}

appModel.getApplicationsByWorkerId = async function (work_id) {
    try {
        // Retrieve the documents from the database
        const applications = await collect.find({ work_id: work_id }).toArray();

        // Return the results of the operation
        if (applications.length)
            return [200, applications];
        else
            return [404, "No applications with that Worker ID found."];

    } catch (error) {
        return [500, "Database Error"];
    }
}

appModel.getApplicationsByJobPostingId = async function (job_id) {
    try {
        // Retrieve the documents from the database
        const applications = await collect.find({ job_id: job_id }).toArray();

        // Return the results of the operation
        if (applications.length)
            return [200, applications];
        else
            return [404, "No applications with that Job Posting ID found."];

    } catch (error) {
        return [500, "Database Error"];
    }
}

appModel.createApplication = async function (app_doc) {
    // Insert the document into the collection
    const result = await collect.insertOne(app_doc);

    // Return the status of the operation
    if (result.acknowledged)
        return [200, "Job Application Created."];
    else
        return [500, "Database Error."];
}
//-------------------------------------------------------------------//
appModel.updateApplication = async function (app_id, app_doc) {
    try {
        const aid = new ObjectId(app_id);
        const result = await collect.updateOne({ _id: aid }, { $set: app_doc });

        if (result.acknowledged && result.matchedCount) {
            return [200, "Application Updated"];
        } else if (result.acknowledged) {
            return [404, "No Application with that ID to Update"];
        } else {
            return [500, "Database Error"];
        }
    } catch (error) {
        return [500, "Database Error"];
    }
};


appModel.deleteApplication = async function (app_id) {
    try {
        const aid = new ObjectId(app_id);
        const result = await collect.deleteOne({ _id: aid });

        if (result.acknowledged && result.deletedCount) {
            return [200, "Application Deleted"];
        } else if (result.acknowledged) {
            return [404, "No Application with that ID to Delete"];
        } else {
            return [500, "Database Error"];
        }
    } catch (error) {
        return [500, "Database Error"];
    }
};
//-----------------------------------------------------------------//

module.exports = appModel;