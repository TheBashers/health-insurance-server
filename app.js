const express = require("express");
const bodyParser = require("body-parser"); // Import body-parser module
const { calculateRiskScores } = require("./calculateRiskScores.js");
const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Middleware to enable CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/ping", (req, res) => {
    res.json({ message: "Ping successful!" });
});

app.post("/api/v1/risks", (req, res) => {
    res.json(
        calculateRiskScores(
            req.body.age,
            req.body.weight,
            req.body.feet,
            req.body.inches,
            req.body.systolic,
            req.body.diastolic,
            req.body.isFamilyHistoryCancer,
            req.body.isFamilyHistoryAlzheimers,
            req.body.isFamilyHistoryDiabetes
        )
    );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});