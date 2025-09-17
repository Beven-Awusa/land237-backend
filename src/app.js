// src/app.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const xssClean = require("xss-clean");
const cookieParser = require("cookie-parser");

// Import routes
const authRoutes = require("./routes/auth.routes");
const propertyRoutes = require("./routes/property.routes");

// Import error handler middleware
const errorHandler = require("./middleware/error.middleware");

const app = express();

// ===== Middlewares =====

// Security headers
app.use(helmet());

// Enable CORS
app.use(cors({
	origin: process.env.CLIENT_URL || "http://localhost:5173", // React frontend
	credentials: true,
}));

// JSON body parser
app.use(express.json({ limit: "10kb" }));

// Cookie parser
app.use(cookieParser());

// Prevent XSS attacks
//app.use(xssClean());

// Logger (dev only)
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

// Rate limiting (apply to auth routes mostly)
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 mins
	max: 100, // limit each IP
	message: "Too many requests from this IP, please try again later.",
});
app.use("/api/auth", limiter);

// ===== Routes =====
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);

// Default route
app.get("/", (req, res) => {
	res.json({ success: true, message: "Land237 Backend API running 🚀" });
});

// ===== Error Middleware =====
app.use(errorHandler);

module.exports = app;
