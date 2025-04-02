const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

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
    const PORT = process.env.PORT || 3000; // Added a fallback value
    app.listen(PORT, () => {
      console.log(`🚀  Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌  MongoDB Connection Error:", err);
    process.exit(1); // Stop deployment if DB connection fails
  });

// Routes
app.get("/", (req, res) => {
  res.send("✅  Todo App Backend is running!");
});


