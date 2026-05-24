const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const nutritionRoutes = require("./routes/nutritionRoutes");

dotenv.config();

const app = express();

const defaultOrigins = [
  "http://localhost:5173",
  "https://herbal-sync-git-main-divya12.vercel.app",
  "https://herbal-sync-j3hwdhrg9-divya12.vercel.app",
];
const allowedOrigins = [
  ...defaultOrigins,
  ...(process.env.CLIENT_URL || "").split(","),
]
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/nutrition", nutritionRoutes);

app.get("/", (req, res) => {
  res.send("HerbalSync API Running");
});

const PORT = process.env.PORT || 5000;
let isDbConnected = false;

const connectWithRetry = async () => {
  try {
    await connectDB();
    isDbConnected = true;
  } catch (error) {
    isDbConnected = false;
    console.error("Retrying MongoDB connection in 10 seconds");
    setTimeout(connectWithRetry, 10000);
  }
};

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    database: isDbConnected ? "connected" : "connecting",
  });
});

const startServer = () => {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is required");
    process.exit(1);
  }

  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is required");
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  connectWithRetry();
};

startServer();
