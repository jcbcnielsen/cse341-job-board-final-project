const { client, ObjectId } = require("../database/");
const database = client.db("");
const collect = database.collection("workers");
const workModel = {};

workModel.getAllWorkers = async function () {
    try {
        // Retrieve the documents from the database
        const workers = await collect.find().toArray();

        // Return the results of the operation
        return [200, workers];

    } catch (error) {
        return [500, "Database Error"];
    }
}

workModel.getWorkerById = async function (work_id) {
    try {
        // Convert the work_id string into an ObjectId
        const wid = new ObjectId(work_id);

        // Retrive the document from the database
        const worker = await collect.findOne({ _id: wid });

        // Return the results of the operation
        if (worker)
            return [200, worker];
        else
            return [404, "No worker with that Id found."];
    } catch (error) {
        return [500, "Database Error"];
    }
}

workModel.createWorker = async function (work_doc) {
    // Insert the document into the collection
    const result = await collect.insertOne(work_doc);

    // Return the status of the operation
    if (result.acknowledged)
        return [200, "Worker Created."];
    else
        return [500, "Database Error."];
}
//----------------------------------------------------------------------//
workModel.updateWorker = async function (work_id, work_doc) {
    try {
        const wid = new ObjectId(work_id);
        const result = await collect.updateOne({ _id: wid }, { $set: work_doc });

        if (result.acknowledged && result.matchedCount) {
            return [200, "Worker Updated"];
        } else if (result.acknowledged) {
            return [404, "No Worker with that ID to Update"];
        } else {
            return [500, "Database Error"];
        }
    } catch (error) {
        return [500, "Database Error"];
    }
};


workModel.deleteWorker = async function (work_id) {
    try {
        const wid = new ObjectId(work_id);
        const result = await collect.deleteOne({ _id: wid });

        if (result.acknowledged && result.deletedCount) {
            return [200, "Worker Deleted"];
        } else if (result.acknowledged) {
            return [404, "No Worker with that ID to Delete"];
        } else {
            return [500, "Database Error"];
        }
    } catch (error) {
        return [500, "Database Error"];
    }
};
//----------------------------------------------------------------------//

module.exports = workModel;