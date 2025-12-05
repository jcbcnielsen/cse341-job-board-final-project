const { ObjectId } = require("mongodb");
const jobModel = require("../../models/jobModel");

const job_id = "69331ba26eed966715dba347";
const jid = new ObjectId(job_id);
const com_id = "692e1d6aee6206d4a488d350";

// Test model function from GET /jobs/all route
test("should retrive an array of job posting document objects", async function() {
    const results = await jobModel.getAllJobPostings();

    expect(results[0]).toBe(200);
    expect(results[1]).toMatchObject(
        expect.arrayContaining([
            expect.objectContaining({
                "_id": expect.any(ObjectId),
                "title": expect.any(String),
                "description": expect.any(String),
                "com_id": expect.any(String),
                "location": expect.any(String),
                "posted_date": expect.any(String),
                "salary_range": expect.objectContaining({
                    "min": expect.any(Number),
                    "max": expect.any(Number)
                }),
                "employment_type": expect.any(String),
                "requirements": expect.arrayContaining([
                    expect.any(String)
                ])
            })
        ])
    );
});

// Test model function from GET /jobs/:job_id route success
test("should retrive a job posting document object", async function() {
    const results = await jobModel.getJobPostingById(job_id);

    expect(results[0]).toBe(200);
    expect(results[1]).toMatchObject(
        expect.objectContaining({
            "_id": jid,
            "title": expect.any(String),
            "description": expect.any(String),
            "com_id": expect.any(String),
            "location": expect.any(String),
            "posted_date": expect.any(String),
            "salary_range": expect.objectContaining({
                "min": expect.any(Number),
                "max": expect.any(Number)
            }),
            "employment_type": expect.any(String),
            "requirements": expect.arrayContaining([
                expect.any(String)
            ])
        })
    );
});

// Test model function from GET /jobs/:job_id route file not found
test("should return a 404 error", async function() {
    const fnf_id = "111111111111111111111111";
    const results = await jobModel.getJobPostingById(fnf_id);
    
    expect(results[0]).toBe(404);
    expect(results[1]).toBe("No Job Posting with that ID");
});

// Test model function from GET /jobs/com/:com_id route
test("should retrive an array of job posting document objects with a given com_id", async function() {
    const results = await jobModel.getJobPostingsByCompanyId(com_id);

    expect(results[0]).toBe(200);
    expect(results[1]).toMatchObject(
        expect.arrayContaining([
            expect.objectContaining({
                "_id": expect.any(ObjectId),
                "title": expect.any(String),
                "description": expect.any(String),
                "com_id": com_id,
                "location": expect.any(String),
                "posted_date": expect.any(String),
                "salary_range": expect.objectContaining({
                    "min": expect.any(Number),
                    "max": expect.any(Number)
                }),
                "employment_type": expect.any(String),
                "requirements": expect.arrayContaining([
                    expect.any(String)
                ])
            })
        ])
    );
});