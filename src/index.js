// src/index.js
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/land237";

// Connect to MongoDB
mongoose
	.connect(MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("✅ Connected to MongoDB");
		app.listen(PORT, () => {
			console.log(`🚀 Server running on http://localhost:${PORT}`);
		});
	})
	.catch((err) => {
		console.error("❌ MongoDB connection error:", err.message);
		process.exit(1);
	});
