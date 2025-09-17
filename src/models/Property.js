// src/models/Property.js
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const propertySchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, "Property title is required"],
			trim: true,
		},
		description: {
			type: String,
			required: [true, "Property description is required"],
			trim: true,
		},
		price: {
			type: Number,
			required: [true, "Property price is required"],
			min: [0, "Price cannot be negative"],
		},
		location: {
			type: String,
			required: [true, "Property location is required"],
		},
		images: {
			type: [String], // array of image URLs
			default: [],
		},
		propertyId: {
			type: String,
			default: uuidv4, // unique ID for frontend reference
			unique: true,
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		status: {
			type: String,
			enum: ["available", "sold", "pending"],
			default: "available",
		},
		videoLink: {
			type: String,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Property", propertySchema);
