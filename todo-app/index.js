const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files (like index.html) from the root directory
app.use(express.static(path.join(__dirname)));

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("❌  MONGO_URI is not defined in environment variables!");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅  Connected to MongoDB");

    // Start the server **only after** a successful database connection
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀  Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌  MongoDB Connection Error:", err);
    process.exit(1);
  });

// Serve index.html explicitly
app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "index.html");
  res.setHeader("Content-Type", "text/html"); // Set MIME type
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("❌  Error serving index.html:", err);
      res.status(500).send("Server Error");
    }
  });
});

