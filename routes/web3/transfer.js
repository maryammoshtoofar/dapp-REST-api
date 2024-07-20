const express = require("express");
const router = express.Router();
const {
  transferToken,
} = require("../../controllers/web3/transferTokenController");

router.post("/", async (req, res) => {
  const { amount, receiver } = req.body;
  const tx = await transferToken(amount, receiver);
  res.json(tx);
});

module.exports = router;
