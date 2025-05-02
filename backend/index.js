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
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something broke!",
    details: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});
app.use(
  cors({
    origin: ["http://localhost:5173", "https://abha-web-2.onrender.com"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use((err, req, res, next) => {
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({
      error: "File too large",
      message: "Maximum file size is 10MB",
    });
  }
  // Handle other errors
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(fileUpload()); // Add file upload middleware

// Remove the static uploads folder serving since we're using Cloudinary
// app.use("/uploads", express.static("uploads"));

// Basic route
app.get("/", (req, res) => {
  res.send("✅ Server is live and working!");
});

// API Routes
app.use("/api", programmeRoutes);
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
