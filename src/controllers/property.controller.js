// src/controllers/property.controller.js
const Property = require("../models/Property");

// @desc    Create a new property
// @route   POST /api/properties
// @access  Private
const createProperty = async (req, res, next) => {
	try {
		const { title, description, price, location, images } = req.body;

		if (!title || !description || !price || !location) {
			return res.status(400).json({
				success: false,
				message: "Please provide title, description, price, and location",
			});
		}

		const property = await Property.create({
			title,
			description,
			price,
			location,
			images: images || [],
			owner: req.user._id,
		});

		res.status(201).json({
			success: true,
			message: "Property created successfully",
			data: property,
		});
	} catch (err) {
		next(err);
	}
};

// @desc    Get all properties
// @route   GET /api/properties
// @access  Public
const getProperties = async (req, res, next) => {
	try {
		const properties = await Property.find().populate("owner", "name email");
		res.status(200).json({
			success: true,
			data: properties,
		});
	} catch (err) {
		next(err);
	}
};

// @desc    Get property by ID
// @route   GET /api/properties/:id
// @access  Public
const getPropertyById = async (req, res, next) => {
	try {
		const property = await Property.findById(req.params.id).populate(
			"owner",
			"name email"
		);

		if (!property) {
			return res.status(404).json({
				success: false,
				message: "Property not found",
			});
		}

		res.status(200).json({
			success: true,
			data: property,
		});
	} catch (err) {
		next(err);
	}
};

// @desc    Update property by ID
// @route   PUT /api/properties/:id
// @access  Private
const updateProperty = async (req, res, next) => {
	try {
		const property = await Property.findById(req.params.id);

		if (!property) {
			return res.status(404).json({
				success: false,
				message: "Property not found",
			});
		}

		// Ensure the logged-in user is the owner
		if (property.owner.toString() !== req.user._id.toString()) {
			return res.status(403).json({
				success: false,
				message: "Not authorized to update this property",
			});
		}

		// Update fields
		const updates = req.body;
		Object.assign(property, updates);

		const updatedProperty = await property.save();

		res.status(200).json({
			success: true,
			message: "Property updated successfully",
			data: updatedProperty,
		});
	} catch (err) {
		next(err);
	}
};

// @desc    Delete property by ID
// @route   DELETE /api/properties/:id
// @access  Private
const deleteProperty = async (req, res, next) => {
	try {
		const property = await Property.findById(req.params.id);

		if (!property) {
			return res.status(404).json({
				success: false,
				message: "Property not found",
			});
		}

		// Ensure the logged-in user is the owner
		if (property.owner.toString() !== req.user._id.toString()) {
			return res.status(403).json({
				success: false,
				message: "Not authorized to delete this property",
			});
		}

		await property.remove();

		res.status(200).json({
			success: true,
			message: "Property deleted successfully",
		});
	} catch (err) {
		next(err);
	}
};

module.exports = {
	createProperty,
	getProperties,
	getPropertyById,
	updateProperty,
	deleteProperty,
};
