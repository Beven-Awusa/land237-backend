// src/models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Name is required"],
			trim: true,
			minlength: [2, "Name must be at least 2 characters long"],
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			lowercase: true,
			match: [/.+@.+\..+/, "Please enter a valid email"],
		},
		password: {
			type: String,
			required: [true, "Password is required"],
			minlength: [6, "Password must be at least 6 characters long"],
			select: false, // don’t return password by default
		},
		phonumber: {
			type: [String],
			required: [true, "phone number is required"],
		},
		location: {
			type: String,

		},

		role: {
			type: String,
			enum: ["user", "admin","agent"],
			default: "user",
		},
	},
	{ timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	this.password = await bcrypt.hash(this.password, 10);
	next();
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
