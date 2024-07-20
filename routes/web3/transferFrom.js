const express = require("express");
const router = express.Router();
const { transferFrom } = require("../controllers/transferFromController");

router.post("/", async (req, res) => {
    const { amount, sender, receiver } = req.body;
    const result = await transferFrom(amount, sender, receiver);
    res.json(result);
  });

module.exports = router;
