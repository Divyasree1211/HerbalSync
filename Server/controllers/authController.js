
const generateToken = require("../utils/generateToken");

const User = require("../models/User");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, hairType, skinType, nutritionGoal } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      hairType,
      skinType,
      nutritionGoal,
    });

    res.status(201).json({
      message: "User registered successfully",
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        hairType: user.hairType,
        skinType: user.skinType,
        nutritionGoal: user.nutritionGoal,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};




const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });

    // Check user exists
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        hairType: user.hairType,
        skinType: user.skinType,
        nutritionGoal: user.nutritionGoal,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};


const getProfile = async (req, res) => {
  res.status(200).json(req.user);
};

module.exports = {
  registerUser,
   loginUser,
   getProfile,
};
