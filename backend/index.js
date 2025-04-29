// backend/index.js
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const programmeRoutes = require("./routes/programmeroutes");
const feedbackRoutes = require("./routes/feedbackroutes");
const contactRoutes = require("./routes/contact");
// Corrected variable name

dotenv.config();
const app = express();
const PORT = 5000;

// MongoDB Connection URI (check your .env for correct key)
const MONGO_URI = process.env.MONGO_URL; // Corrected the variable name here

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads")); // Serve static files from 'uploads'

// Basic route
app.get("/", (req, res) => {
  res.send("✅ Server is live and working!");
});

// API Routes
app.use("/api/programmes", programmeRoutes); // Correct route path
app.use("/api/feedback", feedbackRoutes); // Correct route path
app.use("/api/contact", contactRoutes);
// Correct route path

// Connect to MongoDB and start server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () =>
      console.log(`🚀 Server running at http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });
