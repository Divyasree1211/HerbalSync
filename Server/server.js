const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const nutritionRoutes = require("./routes/nutritionRoutes");

// Load environment variables
dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://herbal-sync-git-main-divya12.vercel.app",
      "https://herbal-sync-j3hwdhrg9-divya12.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/nutrition", nutritionRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("HerbalSync API Running 🚀");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
