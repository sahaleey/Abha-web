// routes/programmeroutes.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const Programme = require("../models/programme");

const router = express.Router();

// Configure multer for memory storage (no need for disk storage with Cloudinary)
const upload = multer({ storage: multer.memoryStorage() });

// Create Programme with Cloudinary upload
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, stage, host, date, startTime, description, category } =
      req.body;

    // Validate time format (optional extra validation)
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(startTime)) {
      return res
        .status(400)
        .json({ message: "Invalid start time format. Use HH:MM" });
    }

    // Cloudinary upload logic remains the same...
    const newProgramme = new Programme({
      name,
      stage,
      host,
      date: new Date(date), // Ensure proper date parsing
      startTime,
      description,
      category,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });

    await newProgramme.save();
    res.status(201).json(newProgramme);
  } catch (error) {
    console.error("Error creating programme:", error);
    res.status(500).json({
      message: "Error creating programme",
      error: error.message,
    });
  }
});

// Get all Programmes
router.get("/", async (req, res) => {
  try {
    const programmes = await Programme.find();
    res.json(programmes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Programme with Cloudinary cleanup
router.delete("/:id", async (req, res) => {
  try {
    const programme = await Programme.findById(req.params.id);

    if (!programme) {
      return res.status(404).json({ message: "Programme not found" });
    }

    // Delete image from Cloudinary if exists
    if (programme.image && programme.image.public_id) {
      await cloudinary.uploader.destroy(programme.image.public_id);
    }

    // Delete the programme from database
    await Programme.findByIdAndDelete(req.params.id);

    res.json({ message: "Programme deleted successfully" });
  } catch (error) {
    console.error("Error deleting programme:", error);
    res.status(500).json({
      message: "Error deleting programme",
      error: error.message,
    });
  }
});

module.exports = router;
