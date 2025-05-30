const express = require("express");

const authMiddleware = require("../middlewares/auth");

const upload = require("../middlewares/uploadImage");

const authController = require("../controllers/auth");

const router = express.Router();

// Register user
router.post("/register", authController.register);

// Login user
router.post("/login", authController.login);

// Verify user
router.post("/verify", authController.verify);

// Get user info
router.get("/me", authMiddleware, authController.getMe);

// Handle image upload
router.post("/upload-image", upload.single("image"), (req, res) => {
    const file = req.file;

    if (!file || file.length === 0) {
        return res.status(400).json({success: false, message: 'No files uploaded'});
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;

    res.status(200).json({imageUrl});
});

module.exports = router;
