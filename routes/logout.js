const express = require("express");
const router = express.Router();
const logoutController = require("../controllers/user/logoutController");

router.get("/", logoutController.handleLogout);

module.exports = router;
