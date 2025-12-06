// This file is the main project file

// Require statements
const express = require("express");
const env = require("dotenv").config();
const app = express();
const bodyParser = require("body-parser");
const { auth } = require("express-openid-connect");
const comRoute = require("./routes/comRoute");
const jobRoute = require("./routes/jobRoute");
const workRoute = require("./routes/workRoute");
const appRoute = require("./routes/appRoute");
const swaggerUI = require("swagger-ui-express");
const swaggerDoc = require("./api-docs/swagger.json");


// ------------------------------------------------
// Middleware
app.use(bodyParser.json());

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH_SECRET,
    baseURL: process.env.URL,  //local or render url
    clientID: process.env.AUTH_CLIENT_ID,
    issuerBaseURL: process.env.AUTH_BASE_URL
}; 

// ------------------------------------------------
// Routes

//route to show welcome message
app.get("/", (req, res) => {
  res.send("Welcome to the Job Board API!");
});


// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
}); 

// Companies API route
app.use("/com", comRoute);

// Job Postings API route
app.use("/jobs", jobRoute);

// Workers API route
app.use("/work", workRoute);

// Job Applications API route
app.use("/app", appRoute);

// Documentation route
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

// ------------------------------------------------
// Local server info
const port = process.env.PORT;
const host = process.env.HOST;

// ------------------------------------------------
// Log statement to confirm server operation
app.listen(port, function() {
    console.log(`App listening on ${host}:${port}`);
});