const mongoose = require("mongoose");

const programmeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Programme name is required"],
    },
    host: {
      type: String,
      required: [true, "Host name is required"],
    },
    stage: {
      type: String,
      required: [true, "Stage is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    category: {
      type: String,
      enum: ["already_done", "want_to_do"],
      required: [true, "Category is required"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    startTime: {
      type: String,
      required: [true, "Start time is required"],
      match: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, // 24-hour format validation
    },

    image: {
      public_id: {
        type: String,
        required: [true, "Image public ID is required"],
      },
      url: {
        type: String,
        required: [true, "Image URL is required"],
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Programme", programmeSchema);
