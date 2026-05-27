const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("../backend/dist/routes").default;
const { errorHandler } = require("../backend/dist/middleware/errorHandler");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);
app.use(errorHandler);

module.exports = async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    try {
      const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/medibook";
      await mongoose.connect(uri);
      console.log("MongoDB connected");
    } catch (err) {
      console.error("DB connection failed:", err);
      res.status(500).json({ error: "Database connection failed: " + err.message });
      return;
    }
  }
  app(req, res);
};
