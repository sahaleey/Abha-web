// routes/programmeroutes.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const Programme = require("../models/programme");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

// Configure multer for memory storage (no need for disk storage with Cloudinary)
const upload = multer({
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit (in bytes)
    files: 1, // Limit to 1 file
  },
  fileFilter: (req, file, cb) => {
    // Accept images only
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
  storage: multer.memoryStorage(), // Use memory storage
});

const validateTime = (req, res, next) => {
  let { startTime } = req.body;

  // If time comes without colon (e.g., "1430"), add it
  if (startTime && startTime.length === 4 && !startTime.includes(":")) {
    startTime = `${startTime.slice(0, 2)}:${startTime.slice(2)}`;
    req.body.startTime = startTime; // Update the request
  }

  const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  if (!timeRegex.test(startTime)) {
    return res.status(400).json({
      message:
        "Invalid start time format. Use HH:MM (24-hour format, e.g., 14:30)",
    });
  }
  next();
};

// Create Programme with Cloudinary upload
router.post(
  "/programmes",
  authMiddleware,
  upload.single("image"),
  validateTime,
  async (req, res) => {
    try {
      const { name, stage, host, date, startTime, description, category } =
        req.body;
      console.log(req.file);
      console.log(req.body);
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "programmes" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      const newProgramme = new Programme({
        name,
        stage,
        host,
        date: new Date(date),
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
      console.error("Server error:", error);
      res.status(500).json({
        error: "Internal Server Error",
        details: error.message,
      });
    }
  }
);

// Get all Programmes
router.get("/programmes", authMiddleware, async (req, res) => {
  try {
    const programmes = await Programme.find();
    res.json(programmes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Programme with Cloudinary cleanup
router.delete("/programmes/:id", async (req, res) => {
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
