const { connectDB } = require("../backend/dist/config/db");

const app = require("../backend/dist/index").default;

module.exports = async (req, res) => {
  try {
    await connectDB();
  } catch (err) {
    console.error("DB connection failed:", err);
    res.status(500).json({ error: "Database connection failed" });
    return;
  }
  app(req, res);
};
