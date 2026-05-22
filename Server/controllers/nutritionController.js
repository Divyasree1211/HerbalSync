const NutritionLog = require("../models/NutritionLog");

const createNutritionLog = async (req, res) => {
  try {
    const { calories, protein, waterIntake, date } = req.body;

    const log = await NutritionLog.create({
      userId: req.user._id,
      calories,
      protein,
      waterIntake,
      date: date || new Date(),
    });

    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getNutritionHistory = async (req, res) => {
  try {
    const logs = await NutritionLog.find({ userId: req.user._id }).sort({ date: -1 });

    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  createNutritionLog,
  getNutritionHistory,
};
