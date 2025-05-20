// backend/index.js
const dotenv = require("dotenv");
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const feedbackRoutes = require("./routes/feedbackroutes");
const contactRoutes = require("./routes/contact");
const { createProxyMiddleware } = require("http-proxy-middleware");

dotenv.config();
const app = express();
const PORT = 5000;

const MONGO_URI = process.env.MONGO_URL;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Basic route
app.get("/", (req, res) => {
  res.send("✅ Server is live and working!");
});

// API Routes

app.use("/api/feedback", feedbackRoutes);
app.use("/api/contact", contactRoutes);
// Proxy Chat Requests to FastAPI
app.use(
  "/api/chat",
  createProxyMiddleware({
    target: "http://localhost:8000",
    changeOrigin: true,
    pathRewrite: {
      "^/api/chat": "/chat",
    },
  })
);

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
