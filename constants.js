require("dotenv").config();
const ethers = require("ethers");
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
    _24: 7.5,
  },
  _10100to20000: {
    _12: 7.75,
    _18: 8,
    _24: 8.25,
  },
  _25000to100000: {
    _24: 8.5,
  },
};
const apiUrl = process.env.API_URL;
const contractFactoryAddress = process.env.CONTRACT_FACTORY_ADDRESS;
const dappTokenContractAddress = process.env.DAPP_TOKEN_CONTRACT;
const genealogyContractAddress = process.env.GENEALOGY_CONTRACT;
const privateKey = process.env.ERC20_ADMIN_WALLET;
const APIKey = process.env.API_KEY;
const polygonApikey = process.env.POLYGON_SCAN_API_KEY;
const ABI = {
  tokenAbi: require("./ABI/tokenAbi.json"),
  contractFactoryAbi: require("./ABI/contractFactoryAbi.json"),
  contractInstance: require("./ABI/contractFactoryAbi.json"),
  genealogyContractAbi: require("./ABI/genealogyAbi.json"),
};
const provider = new ethers.AlchemyProvider("matic", APIKey);
const Wallet = new ethers.Wallet(privateKey, provider);

const dappTokenContract = new ethers.Contract(
  dappTokenContractAddress,
  ABI.tokenAbi,
  Wallet
);

const stakingFactoryContract = new ethers.Contract(
  contractFactoryAddress,
  ABI.contractFactoryAbi,
  Wallet
);

const genealogyContract = new ethers.Contract(
  genealogyContractAddress,
  ABI.genealogyContractAbi,
  Wallet
);

const getDecimals = async () => {
  const decimal = await dappTokenContract.decimals();
  return Number(decimal);
};
const port = process.env.PORT || 8080;
const routes = [
  "/health",
  "/transfer",
  "/build-new-contract",
  "/delete-contract",
];
module.exports = {
  Wallet,
  dappTokenContract,
  stakingFactoryContract,
  genealogyContract,
  rewardRatios,
  apiUrl,
  contractFactoryAddress,
  dappTokenContractAddress,
  privateKey,
  ABI,
  getDecimals,
  polygonApikey,
  port,
  routes,
};
