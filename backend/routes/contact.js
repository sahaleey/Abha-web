const express = require("express");
const { Resend } = require("resend");
const router = express.Router();

const resend = new Resend(process.env.RESEND_API_KEY); // get this from https://resend.com

router.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "abhamates14@gmail.com", // Replace with your email
      subject: "📩 New Contact Form Message",
      html: `
        <h3>New Message from Contact Form</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    });

    res
      .status(200)
      .json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Email sending failed:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

module.exports = router;
