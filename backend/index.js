// backend/index.js
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cloudinary = require("cloudinary").v2;
const fileUpload = require("express-fileupload");
const programmeRoutes = require("./routes/programmeroutes");
const feedbackRoutes = require("./routes/feedbackroutes");
const contactRoutes = require("./routes/contact");

dotenv.config();
const app = express();
const PORT = 5000;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URL;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload()); // Add file upload middleware

// Remove the static uploads folder serving since we're using Cloudinary
// app.use("/uploads", express.static("uploads"));

// Basic route
app.get("/", (req, res) => {
  res.send("✅ Server is live and working!");
});

// API Routes
app.use("/api/programmes", programmeRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/contact", contactRoutes);

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
