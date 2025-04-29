// routes/programmeroutes.js
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const Programme = require("../models/programme");

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Create Programme
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, stage, host, date, description, category } = req.body;
    const image = req.file ? req.file.filename : null;

    const newProgramme = new Programme({
      name,
      stage,
      host,
      date,
      description,
      category,
      image: req.file.filename,
    });

    await newProgramme.save();
    res.status(201).json(newProgramme);
  } catch (error) {
    res.status(400).json({ message: error.message });
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

// Delete Programme
router.delete("/:id", async (req, res) => {
  try {
    const programmeId = req.params.id;
    const programme = await Programme.findById(programmeId);

    if (!programme) {
      return res.status(404).json({ message: "Programme not found" });
    }

    // Delete the image file if it exists
    if (programme.image) {
      const imagePath = path.join(__dirname, "..", "uploads", programme.image);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Failed to delete image file:", err);
        } else {
          console.log("Image file deleted successfully:", programme.image);
        }
      });
    }

    // Now delete the programme from database
    await Programme.findByIdAndDelete(programmeId);

    res
      .status(200)
      .json({ message: "Programme and its image deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting programme" });
  }
});

module.exports = router;
