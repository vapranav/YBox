var mongoose = require("mongoose");
const { Schema } = mongoose;

const submissionLikeSchema = new Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  submission: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Submission",
  },
});

module.exports = mongoose.model("SubmissionLike", submissionLikeSchema);
