const { ObjectId } = require("mongodb");
const workModel = require("../../models/workModel");

const work_id = "69330bb0062e423713cd3161";
const wid = new ObjectId(work_id);

// Test model function from GET /work/all route
test("should retrive an array of worker document objects", async function() {
    const results = await workModel.getAllWorkers();

    expect(results[0]).toBe(200);
    expect(results[1]).toMatchObject(
        expect.arrayContaining([
            expect.objectContaining({
                "_id": expect.any(ObjectId),
                "first_name": expect.any(String),
                "last_name": expect.any(String),
                "address": expect.any(String),
                "email": expect.any(String),
                "phone": expect.any(Number)
            })
        ])
    );
});

// Test model function from GET /work/:work_id route success
test("should retrive a worker document object", async function() {
    const results = await workModel.getWorkerById(work_id);

    expect(results[0]).toBe(200);
    expect(results[1]).toMatchObject(
        expect.objectContaining({
            "_id": wid,
            "first_name": expect.any(String),
            "last_name": expect.any(String),
            "address": expect.any(String),
            "email": expect.any(String),
            "phone": expect.any(Number)
        })
    );
});

// Test model function from GET /work/:work_id route file not found
test("should return a 404 error", async function() {
    const fnf_id = "111111111111111111111111";
    const results = await workModel.getWorkerById(fnf_id);
    
    expect(results[0]).toBe(404);
    expect(results[1]).toBe("No worker with that Id found.");
});

// Test model function from GET /work/:work_id route database error handling
test("should return a 500 error", async function() {
    const not_id = "notarealid";
    const results = await workModel.getWorkerById(not_id);

    expect(results[0]).toBe(500);
    expect(results[1]).toBe("Database Error");
});