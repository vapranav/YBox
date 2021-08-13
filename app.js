// Import modules

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
const dotenv = require("dotenv");
dotenv.config();

//Import models

var User = require("./models/User");
var Competition = require("./models/Competition");
var Submission = require("./models/Submission");
var SubmissionLike = require("./models/SubmissionLike");

//Connect to DB
const mongoose = require("mongoose");
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

/**** UTILITY FUNCTIONS ******/

/* Function to populate 10 submissions into 5 competitions.

async function createSubmissions() {
  let competitions = await Competition.find({}).lean();
  competitions.forEach(async (competition) => {
    for (let i = 0; i < 10; i++) {
      await Submission.create(
        {
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Football_iu_1996.jpg/1200px-Football_iu_1996.jpg",
          author: "611657d635b39f16c017ce39",
          competition: competition._id,
        },
        function (err, small) {
          if (err) return handleError(err);
        }
      );
    }
  });

  console.log(competitions);
}
createSubmissions();
*/

/* Function to create likes for random submissions.

async function createLikes() {
  let submissions = await Submission.find({}).lean();
  for (let i = 0; i < 50; i++) {
    let randomIndex = Math.floor(Math.random() * 51);
    SubmissionLike.create(
      {
        author: "6115fd30e30f873b0044941a",
        submission: submissions[randomIndex]._id,
      },
      function (err, small) {
        if (err) return handleError(err);
      }
    );
  }
}
createLikes();
*/

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
