const { ObjectId } = require("mongodb");
const comModel = require("../../models/comModel");

const com_id = "693249aed0b70ddcefb6cb68";
const cid = new ObjectId(com_id);

// Test model function from GET /com/all route
test("should retrive an array of company document objects", async function() {
    const results = await comModel.getAllCompanies();

    expect(results[0]).toBe(200);
    expect(results[1]).toMatchObject(
        expect.arrayContaining([
            expect.objectContaining({
                "_id": expect.any(ObjectId),
                "name": expect.any(String),
                "address": expect.any(String),
                "type": expect.any(String)
            })
        ])
    );
});

// Test model function from GET /com/:com_id route success
test("should retrive a company document object", async function() {
    const results = await comModel.getCompanyById(com_id);

    expect(results[0]).toBe(200);
    expect(results[1]).toMatchObject(
        expect.objectContaining({
            "_id": cid,
            "name": expect.any(String),
            "address": expect.any(String),
            "type": expect.any(String)
        })
    );
});

// Test model function from GET /com/:com_id route file not found
test("should return a 404 error", async function() {
    const fnf_id = "111111111111111111111111";
    const results = await comModel.getCompanyById(fnf_id);

    expect(results[0]).toBe(404);
    expect(results[1]).toBe("No Company with that ID");
});

// Test model function from GET /com/:com_id route database error handling
test("should return a 500 error", async function() {
    const not_id = "notarealid";
    const results = await comModel.getCompanyById(not_id);

    expect(results[0]).toBe(500);
    expect(results[1]).toBe("Database Error");
});