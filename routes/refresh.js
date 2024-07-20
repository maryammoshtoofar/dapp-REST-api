const express = require("express");
const router = express.Router();
const refreshTokenController = require("../controllers/user/refreshTokenController");

router.get("/", refreshTokenController.handleRefreshToken);

module.exports = router;
