const { ObjectId } = require("mongodb");
const appModel = require("../../models/appModel");

const app_id = "69330d43b563d207e836a3bb";
const aid = new ObjectId(app_id);
const work_id = "69330b2c062e423713cd315f";
const job_id = "69330a91062e423713cd315e";

// Test model function from GET /app/all route
test("should retrive an array of job application document objects", async function() {
    const results = await appModel.getAllApplications();

    expect(results[0]).toBe(200);
    expect(results[1]).toMatchObject(
        expect.arrayContaining([
            expect.objectContaining({
                "_id": expect.any(ObjectId),
                "work_id": expect.any(String),
                "job_id": expect.any(String),
                "submitted_date": expect.any(String),
                "resume_filename": expect.any(String)
            })
        ])
    );
});

// Test model function from GET /app/:app_id route success
test("should retrive a job application document object", async function() {
    const results = await appModel.getApplicationById(app_id);

    expect(results[0]).toBe(200);
    expect(results[1]).toMatchObject(
        expect.objectContaining({
            "_id": aid,
            "work_id": expect.any(String),
            "job_id": expect.any(String),
            "submitted_date": expect.any(String),
            "resume_filename": expect.any(String)
        })
    );
});

// Test model function from GET /app/:app_id route file not found
test("should return a 404 error", async function() {
    const fnf_id = "111111111111111111111111";
    const results = await appModel.getApplicationById(fnf_id);
    
    expect(results[0]).toBe(404);
    expect(results[1]).toBe("No application with that ID found.");
});

// Test model function from GET /app/work/:work_id route
test("should retrive an array of job application document objects with a given work_id", async function() {
    const results = await appModel.getApplicationsByWorkerId(work_id);

    expect(results[0]).toBe(200);
    expect(results[1]).toMatchObject(
        expect.arrayContaining([
            expect.objectContaining({
                "_id": expect.any(ObjectId),
                "work_id": work_id,
                "job_id": expect.any(String),
                "submitted_date": expect.any(String),
                "resume_filename": expect.any(String)
            })
        ])
    );
});

// Test model function from GET /app/job/:job_id route
test("should retrive an array of job application document objects with a given job_id", async function() {
    const results = await appModel.getApplicationsByJobPostingId(job_id);

    expect(results[0]).toBe(200);
    expect(results[1]).toMatchObject(
        expect.arrayContaining([
            expect.objectContaining({
                "_id": expect.any(ObjectId),
                "work_id": expect.any(String),
                "job_id": job_id,
                "submitted_date": expect.any(String),
                "resume_filename": expect.any(String)
            })
        ])
    );
});