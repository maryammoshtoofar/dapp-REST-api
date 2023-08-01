require("dotenv").config();
const Web3 = require("web3");
const BigNumber = require("bignumber.js");
const { calcRewardRatio, monthtoSecond } = require("./utils");
const apiUrl = process.env.API_URL;
const contractFactoryAddress = process.env.CONTRACT_FACTORY_ADDRESS;
const dappTokenContractAddress = process.env.DAPP_TOKEN_CONTRACT;
const privateKey = process.env.ERC20_ADMIN_WALLET;
const tokenAbi = require("./ABI/tokenAbi.json");
const contractFactoryAbi = require("./ABI/contractFactoryAbi.json");
const web3 = new Web3(apiUrl);
web3.eth.accounts.wallet.add(privateKey);
const wallet = web3.eth.accounts.privateKeyToAccount("0x" + privateKey);
const dappTokenContract = new web3.eth.Contract(
  tokenAbi,
  dappTokenContractAddress
);

const stakingFactoryContract = new web3.eth.Contract(
  contractFactoryAbi,
  contractFactoryAddress
);
const express = require("express");

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

// Functions
const generateNewContract = async ({ min, max, month }) => {
  const rewardRatio = calcRewardRatio(min, max, month);
  const decimal = await dappTokenContract.methods.decimals().call();
  const duration = monthtoSecond(month);
  const minDeposit = new BigNumber(min * Math.pow(10, decimal));
  const maxDeposit = new BigNumber(max * Math.pow(10, decimal));
  const rewardDuration = 2592000;

  const gas = await stakingFactoryContract.methods
    .newStakingContract(
      dappTokenContractAddress,
      duration,
      rewardDuration,
      minDeposit,
      maxDeposit,
      rewardRatio
    )
    .estimateGas({ from: wallet.address });

  const result = await stakingFactoryContract.methods
    .newStakingContract(
      dappTokenContractAddress,
      duration,
      rewardDuration,
      minDeposit,
      maxDeposit,
      rewardRatio
    )
    .send({ from: wallet.address, gas: gas });
  return { result };
};

const transferToken = async (amount, receiver) => {
  const value = web3.utils.toWei(String(amount));
  const gas = await dappTokenContract.methods
    .transfer(receiver, value)
    .estimateGas({ from: wallet.address });
  await dappTokenContract.methods
    .transfer(receiver, value)
    .send({ from: wallet.address, gas: gas })
    .then((res) => res)
    .catch((error) => error.message);
};
