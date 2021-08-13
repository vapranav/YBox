var mongoose = require("mongoose");
const { Schema } = mongoose;

const competitionSchema = new Schema({
  name: String,
  description: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Competition", competitionSchema);
