const express = require("express");
const router = express.Router();
const {
  verifyContract,
} = require("../../controllers/web3/transferFromController");

router.get("/", async (req, res) => {
  const result = await verifyContract(req.body);
  res.json(result);
});

module.exports = router;
