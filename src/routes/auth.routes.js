// src/routes/auth.routes.js
const express = require("express");
const { registerUser, loginUser } = require("../controllers/auth.controller");

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register new user
router.post("/register", registerUser);

// @route   POST /api/auth/login
// @desc    Login user and return token
router.post("/login", loginUser);

module.exports = router;
