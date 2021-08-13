var mongoose = require("mongoose");
const { Schema } = mongoose;

const submissionSchema = new Schema({
  image: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  competition: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Competition",
  },
});

module.exports = mongoose.model("Submission", submissionSchema);

// - _id – MongoDB ID
// - image – Image URL as String
// - author – UserID For User Collection
// - competition – CompetitionID For Competition Collection to denote which competition it
// belonged
