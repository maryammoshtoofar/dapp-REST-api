const express = require("express");
const router = express.Router();
const authController = require("../controllers/user/authController");

router.post("/", authController.handleLogin);

module.exports = router;
