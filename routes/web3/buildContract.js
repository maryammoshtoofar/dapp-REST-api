const express = require("express");
const router = express.Router();
const {
  generateNewContract,
} = require("../../controllers/web3/generateNewContractController");

router.post("/", async (req, res) => {
  const result = await generateNewContract(req.body);
  res.json(result);
});

module.exports = router;
