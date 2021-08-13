const express = require("express");
const app = express();
var User = require("./models/User");
var Competition = require("./models/Competition");
var Submission = require("./models/Submission");
var SubmissionLike = require("./models/SubmissionLike");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 3000;

console.log(process.env.DB_PASSWORD);
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://Pranav:" +
    process.env.DB_PASSWORD +
    "@cluster0.p5op3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("we're connected!");
});

// User.create({ name: "pranav", email: "example.com" }, function (err, small) {
//   if (err) return handleError(err);
//   //saved!
// });

// Competition.create(
//   {
//     name: "comp5",
//     description: "five",
//     author: "611657d635b39f16c017ce39",
//   },
//   function (err, small) {
//     if (err) return handleError(err);
//     // saved!
//   }
// );

// Submission.create(
//   {
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Football_iu_1996.jpg/1200px-Football_iu_1996.jpg",
//     author: "611657d635b39f16c017ce39",
//     competition: "6116584858afa508f00a4ed6",
//   },
//   function (err, small) {
//     if (err) return handleError(err);
//   }
// );

// SubmissionLike.create(
//   {
//     author: "6115fd30e30f873b0044941a",
//     submission: "61160e708287bc3c30d2a66f",
//   },
//   function (err, small) {
//     if (err) return handleError(err);
//   }
// );

// Submission.count(
//   {
//     competition: {
//       _id: "6114ecc6a2623d29608111e0",
//     },
//   },
//   function (err, count) {
//     console.log("Number of submissions:", count);
//   }
// );

app.get("/competition", async (req, res) => {
  try {
    const competitions = await Competition.find({}).lean().populate("author");
    const result = new Array();
    for (let i in competitions) {
      let competition = competitions[i];
      const count = await Submission.countDocuments({
        competition: competition._id,
      });
      competition.submissions = count;
      result.push(competition);
    }
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

app.get("/competition/:id/submissions", async (req, res) => {
  try {
    const submissions = await Submission.find({ competition: req.params.id })
      .lean()
      .populate("author")
      .populate("submission");
    const result = new Array();
    for (let i in submissions) {
      let submission = submissions[i];
      const count = await SubmissionLike.countDocuments({
        submission: submission._id,
      });
      submission.likes = count;
      result.push(submission);
    }
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
