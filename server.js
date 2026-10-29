require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const courseRoutes = require("./routes/courseRoutes");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Course API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/courses", courseRoutes);

// Unknown routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}` });
});

// Handle malformed JSON and other errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({ success: false, message: "Invalid JSON body" });
  }
  console.error(err);
  res.status(500).json({ success: false, message: "Internal server error" });
});

const PORT = process.env.PORT || 5000;
connectDB()
  .then(() => app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`)))
  .catch((err) => {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  });