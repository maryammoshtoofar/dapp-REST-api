require("dotenv").config();
const express = require("express");
const {transferToken} = require("./functions/transferToken");
const {generateNewContract} = require("./functions/generateNewContract")
const app = express();
app.use(express.json());

// transfer tokens api
app.post("/transfer", async (req, res) => {
  try {
    const { amount, receiver } = req.body;
    const result = await transferToken(amount, receiver);
    res.send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// generate a new contract
app.post("/build-new-contract", async (req, res) => {
  try {
    const result = await generateNewContract(req.body);
    res.send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
