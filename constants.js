require("dotenv").config();
const rewardRatios = {
  _100to2000: {
    _12: 5,
    _18: 5.25,
    _24: 5.5,
  },
  _2100to5000: {
    _12: 6,
    _18: 6.25,
    _24: 6.5,
  },
  _5100to10000: {
    _12: 7,
    _18: 7.25,
    _24: 8.25,
  },
  _10100to20000: {
    _12: 7.75,
    _18: 8,
    _24: 8.25,
  },
  _25000to100000:{
    _24: 8.5,
  },
};

const apiUrl = process.env.API_URL;
const contractFactoryAddress = process.env.CONTRACT_FACTORY_ADDRESS;
const dappTokenContractAddress = process.env.DAPP_TOKEN_CONTRACT;
const privateKey = process.env.ERC20_ADMIN_WALLET;

const ABI = {
  tokenAbi:require("./ABI/tokenAbi.json"),
  contractFactoryAbi:require("./ABI/contractFactoryAbi.json"),
}
const Web3 = require("web3");
const web3 = new Web3(apiUrl);

const dappTokenContract = new web3.eth.Contract(
  ABI.tokenAbi,
  dappTokenContractAddress
);

const stakingFactoryContract = new web3.eth.Contract(
  ABI.contractFactoryAbi,
  contractFactoryAddress
);

web3.eth.accounts.wallet.add(privateKey);
const wallet = web3.eth.accounts.privateKeyToAccount("0x" + privateKey);
module.exports = {
  web3,
  dappTokenContract,
  stakingFactoryContract,
  rewardRatios,
  wallet,
  apiUrl,
  contractFactoryAddress,
  dappTokenContractAddress,
  privateKey,
  ABI
};
