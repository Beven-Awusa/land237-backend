// src/routes/property.routes.js
const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
	createProperty,
	getProperties,
	getPropertyById,
	updateProperty,
	deleteProperty,
} = require("../controllers/property.controller");

const router = express.Router();

// Public route: list all properties
router.get("/", getProperties);

// Public route: get property by ID
router.get("/:id", getPropertyById);

// Protected route: create a new property
router.post("/", authMiddleware, createProperty);

// Protected route: update property by ID
router.put("/:id", authMiddleware, updateProperty);

// Protected route: delete property by ID
router.delete("/:id", authMiddleware, deleteProperty);

module.exports = router;
