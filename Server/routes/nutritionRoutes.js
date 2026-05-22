const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  createNutritionLog,
  getNutritionHistory,
} = require("../controllers/nutritionController");

const router = express.Router();

router.post("/", protect, createNutritionLog);
router.get("/history", protect, getNutritionHistory);

module.exports = router;
