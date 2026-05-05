const express = require('express');
const router = express.Router();
const upload = require("../middleware/upload");
const authController = require('../controllers/authController');
const authMiddleware = require('../middleWare/authmiddleware');

// 📸 multer used here
router.post("/register", upload.single("photo"), authController.register);

// router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me',authMiddleware, authController.getme); 

module.exports = router;