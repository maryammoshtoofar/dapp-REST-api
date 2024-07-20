const express = require("express");
const router = express.Router();
const {
  binaryBonuses,
} = require("../../../controllers/web3/bonus/binaryBonusController");

router.get("/", async (req, res) => {
  const tx = await binaryBonuses();
  res.json(tx);
});

module.exports = router;
