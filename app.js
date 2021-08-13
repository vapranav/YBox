// Import modules

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const utils = require("./utilities/populateDatabase");

//Import models

var User = require("./models/User");
var Competition = require("./models/Competition");
var Submission = require("./models/Submission");
var SubmissionLike = require("./models/SubmissionLike");

//Connect to DB
mongoose.connect(
  "mongodb+srv://" +
    process.env.DB_USER +
    ":" +
    process.env.DB_PASSWORD +
    "@cluster0.p5op3.mongodb.net/" +
    process.env.DB_NAME +
    "?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

//Check DB connection

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("we're connected!");
});

/**** UTILS ****/

// utils.createUser();
// utils.createCompetition();
// utils.createSubmissions();
// utils.createLikes();

/**************/

/***** ROUTES *****/

/*
Home Route
*/
app.get("/", (req, res) => {
  res.send(
    "Welcome to the app! Head over to /competition & /competition/:id/submissions"
  );
});

/*
Returns list of competitions
*/

app.get("/competition", async (req, res) => {
  try {
    const competitions = await Competition.find({}).lean().populate("author");
    const result = new Array();
    await Promise.all(
      competitions.map(async (competition) => {
        const count = await Submission.countDocuments({
          competition: competition._id,
        });
        competition.submissions = count;
        result.push(competition);
      })
    );
    console.log(result);
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

/*
Returns list of submissions of specified contest
*/

app.get("/competition/:id/submissions", async (req, res) => {
  try {
    const submissions = await Submission.find({ competition: req.params.id })
      .lean()
      .populate("author")
      .populate("submission");
    const result = new Array();
    await Promise.all(
      submissions.map(async (submission) => {
        const count = await SubmissionLike.countDocuments({
          submission: submission._id,
        });
        submission.likes = count;
        result.push(submission);
      })
    );
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
