// src/controllers/auth.controller.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Generate JWT
const generateToken = (userId) => {
	return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
		expiresIn: "1d", // 1 day
	});
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
	try {
		const { name, email, password } = req.body;

		// Validate input
		if (!name || !email || !password) {
			return res.status(400).json({
				success: false,
				message: "Please provide name, email, and password",
			});
		}

		// Check if user exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({
				success: false,
				message: "User already exists with this email",
			});
		}

		// Create new user
		const user = await User.create({ name, email, password });

		// Send response
		res.status(201).json({
			success: true,
			message: "User registered successfully",
			data: {
				id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
			},
			token: generateToken(user._id),
		});
	} catch (err) {
		next(err);
	}
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		// Validate input
		if (!email || !password) {
			return res.status(400).json({
				success: false,
				message: "Please provide email and password",
			});
		}

		// Check if user exists
		const user = await User.findOne({ email }).select("+password");
		if (!user) {
			return res.status(401).json({
				success: false,
				message: "Invalid email or password",
			});
		}

		// Match password
		const isMatch = await user.matchPassword(password);
		if (!isMatch) {
			return res.status(401).json({
				success: false,
				message: "Invalid email or password",
			});
		}

		// Send response
		res.status(200).json({
			success: true,
			message: "Login successful",
			data: {
				id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
			},
			token: generateToken(user._id),
		});
	} catch (err) {
		next(err);
	}
};

module.exports = {
	registerUser,
	loginUser,
};
