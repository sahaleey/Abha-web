const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");

// POST feedback
router.post("/", async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const feedback = new Feedback({ rating, comment });
    await feedback.save();
    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// GET all feedback (optional)
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
