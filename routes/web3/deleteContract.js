const express = require("express");
const router = express.Router();
const {
  deleteContract,
} = require("../../controllers/web3/deleteContractController");

router.post("/", async (req, res) => {
  const { address } = req.body;
  const result = await deleteContract(address);
  res.json(result);
});

module.exports = router;
