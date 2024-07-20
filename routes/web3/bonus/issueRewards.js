const express = require("express");
const router = express.Router();
const {
  issueReward,
} = require("../../../controllers/web3/bonus/issueRewardsController");

router.get("/", async (req, res) => {
  const tx = await issueReward();
  res.json(tx);
});

module.exports = router;
