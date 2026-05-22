const express = require("express");

const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
} = require("../controllers/productController");

const protect = require("../middleware/authMiddleware");

// Protected create route
router.post("/", protect, createProduct);

// Public get route
router.get("/", getProducts);
router.get("/:id", getProductById);

module.exports = router;
