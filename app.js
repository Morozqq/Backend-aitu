let bodyParser = require("body-parser");

const path = require("path");
const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, resp) => {
    resp.sendFile(__dirname + "/public/index.html");
});

app.get("/calculator", (req, resp) => {
    resp.sendFile(__dirname + "/public/calculator.html");
});

app.get("/history", (req, resp) => {
    resp.sendFile(__dirname + "/public/history.html");
});
app.get("/result", (req, resp) => {
    resp.sendFile(__dirname + "/public/result.html");
});

app.post("/calculator", (req, resp) => {
    let weight = parseInt(req.body.weight);
    const w_type = req.body.w_type;

    if (w_type === "lbs") {
        weight *= 0.45359237;
    }

    let height = parseInt(req.body.height);
    const h_type = req.body.h_type;

    if (h_type === "ft") {
        height *= 0.3048;
    }
    height /= 100;

    let age = parseInt(req.body.age);

    if (isNaN(weight) || isNaN(age) || isNaN(height)) {
        resp.send("Please napishi vse");
    }
    let bmi = weight / height ** 2;
    if (age !== null) {
        if (age > 35) {
            bmi += 0.5;
        } else if (age > 45) {
            bmi += 1;
        } else if (age > 55) {
            bmi += 1.5;
        } else if (age > 60) {
            bmi += 2;
        }
    }

    resp.redirect(`/result?=${bmi}`);
});

app.listen(3000, function () {
    console.log(`server started on port ${port}`);
});
