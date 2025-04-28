// models/programme.js
const mongoose = require("mongoose");

const programmeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  host: { type: String, required: true },
  stage: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: ["already_done", "want_to_do"],
    required: true,
  },
  image: { type: String }, // Store image URL
  date: { type: Date, required: true }, // Added date field
});

const Programme = mongoose.model("Programme", programmeSchema);

module.exports = Programme;
