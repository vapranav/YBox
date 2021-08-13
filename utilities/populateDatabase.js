const mongoose = require("mongoose");
var User = require("../models/User");
var Competition = require("../models/Competition");
var Submission = require("../models/Submission");
var SubmissionLike = require("../models/SubmissionLike");

const createUser = async function () {
  User.create(
    {
      name: "admin",
      email: "anotherexample.com",
    },
    function (err, data) {
      if (err) console.log(err);
    }
  );
};

const createCompetition = async function () {
  for (let i = 0; i < 5; i++) {
    Competition.create(
      {
        name: "Comp100",
        desc: "another competition",
        author: "",
      },
      function (err, data) {
        if (err) console.log(err);
      }
    );
  }
};
const createSubmissions = async function () {
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
        function (err, data) {
          if (err) console.log(err);
        }
      );
    }
  });
};

const createLikes = async function () {
  let submissions = await Submission.find({}).lean();
  for (let i = 0; i < 50; i++) {
    let randomIndex = Math.floor(Math.random() * 51);
    SubmissionLike.create(
      {
        author: "6115fd30e30f873b0044941a",
        submission: submissions[randomIndex]._id,
      },
      function (err, data) {
        if (err) console.log(err);
      }
    );
  }
};

module.exports = {
  createUser: createUser,
  createCompetition: createCompetition,
  createSubmissions: createSubmissions,
  createLikes: createLikes,
};
