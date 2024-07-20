const express = require("express");
const router = express.Router();
const { HealthCheck } = require("../controllers/healthcheckController");

router.get("/", async (_req, res, _next) => {
  try {
    const result = await HealthCheck();
    res.send(result);
  } catch (error) {
    HealthCheck.message = error;
    res.status(503).send();
  }
});

module.exports = router;
