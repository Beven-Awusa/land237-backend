// src/middlewares/auth.middleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
	let token;

	try {
		// Get token from headers (Authorization: Bearer <token>)
		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith("Bearer")
		) {
			token = req.headers.authorization.split(" ")[1];
		}

		if (!token) {
			return res.status(401).json({
				success: false,
				message: "Not authorized, no token provided",
			});
		}

		// Verify token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// Attach user to request (excluding password)
		req.user = await User.findById(decoded.id).select("-password");

		if (!req.user) {
			return res.status(401).json({
				success: false,
				message: "Not authorized, user not found",
			});
		}

		next();
	} catch (err) {
		return res.status(401).json({
			success: false,
			message: "Not authorized, invalid token",
		});
	}
};

module.exports = authMiddleware;
