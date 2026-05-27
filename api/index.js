const { connectDB } = require("../backend/dist/config/db");
const app = require("../backend/dist/index").default;

connectDB();

module.exports = app;
