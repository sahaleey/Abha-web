const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

router.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message)
    return res.status(400).json({ error: "All fields are required" });

  try {
    const newMessage = new Message({ name, email, message });
    await newMessage.save();
    res.status(200).json({ success: true, message: "Message sent!" });
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
