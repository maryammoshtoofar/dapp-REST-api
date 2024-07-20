const express = require("express");
const router = express.Router();
const {
  updateUplinesUniLevel,
} = require("../../../controllers/web3/bonus/UpdateUplinesUniLevelController");

router.post("/", async (req, res) => {
  const { id } = req.body;
  const tx = await updateUplinesUniLevel(id);
  res.json(tx);
});

module.exports = router;
