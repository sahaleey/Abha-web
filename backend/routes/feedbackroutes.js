const express = require("express");
const router = express.Router();
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY); // Ensure this is set in your .env

// POST feedback — sends email instead of saving to DB
router.post("/", async (req, res) => {
  try {
    const { rating, comment } = req.body;

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "abhamates14@gmail.com", // Where you want to receive feedback
      subject: "New Feedback Received",
      html: `
        <h3>New Feedback Submitted</h3>
        <p><strong>Rating:</strong> ${rating}</p>
        <p><strong>Comment:</strong> ${comment || "No comment provided"}</p>
      `,
    });

    res
      .status(200)
      .json({ message: "Feedback submitted and emailed successfully" });
  } catch (error) {
    console.error("Email send error:", error);
    res.status(500).json({ message: "Failed to send feedback email", error });
  }
});

module.exports = router;
