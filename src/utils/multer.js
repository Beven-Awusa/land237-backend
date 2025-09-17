const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Set storage engine
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		const uploadPath = "uploads/properties";
		fs.mkdirSync(uploadPath, { recursive: true }); // ensure folder exists
		cb(null, uploadPath);
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(
			null,
			file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
		);
	},
});

// File filter
const fileFilter = (req, file, cb) => {
	const allowedTypes = /jpeg|jpg|png/;
	const extname = allowedTypes.test(
		path.extname(file.originalname).toLowerCase()
	);
	const mimetype = allowedTypes.test(file.mimetype);

	if (extname && mimetype) {
		return cb(null, true);
	} else {
		cb(new Error("Only images (jpeg, jpg, png) are allowed"));
	}
};

const upload = multer({
	storage,
	limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
	fileFilter,
});

module.exports = upload;
