//still a work in progress
const { polygonApikey } = require("../../constants");
const axios = require("axios");
const { Interface } = require("ethers");
const { stakingFactoryContract, ABI } = require("../../constants");
const abi = ABI.contractInstance;
const getABIEncoded = () => {
  const interface = Interface.from(abi);
};

const verifyContract = async () => {
  try {
    // return stakingFactoryContract.getContractCount();
    //     0		address	0x74FE11d7ca92aD03a917406005341F4cc68791b8
    // 1	_duration	uint256	31556952
    // 2	_rewardDuration	uint256	2629800
    // 3	_minDeposit	uint256	100000000
    // 4	_maxDeposit	uint256	2000000000
    // 5	_rewardRatio
  } catch (error) {
    return error.message;
  }
  const abiCoder = ethers.AbiCoder.defaultAbiCoder();
  const params = abiCoder.encode(
    JSON.parse(require("../../ABI/contractInstanceAbi.json"))
  );
  // array to encode
  try {
    const result = await axios({
      method: "POST",
      url: `//api.polygonscan.com/api`,
      data: {
        apikey: "9PKY2BGW4CAV98358EH8GGDU84TNRF4I4H", //A valid API-Key is required
        module: "contract", //Do not change
        action: "verifysourcecode", //Do not change
        contractaddress, //Contract Address starts with 0x...
        sourceCode: require("../sourceCode.js"), //Contract Source Code (Flattened if necessary)
        codeformat: "solidity-single-file", //solidity-single-file (default) or solidity-standard-json-input (for std-input-json-format support
        contractname: "StakingContract",
        compilerversion: "v0.8.18", // see https://polygonscan.com/solcversions for list of support versions
        optimizationUsed: 0, //0 = No Optimization, 1 = Optimization used (applicable when codeformat=solidity-single-file)
        runs: 200, //set to 200 as default unless otherwise  (applicable when codeformat=solidity-single-file)
        licenseType: 3, //Valid codes 1-12 where 1=No License .. 12=Apache 2.0, see https://polygonscan.com/contract-license-types
      },
      success: function (result) {
        return {
          status: result.status,
          message: result.message,
          guid: result.result,
        };
      },
      error: function (error) {
        return {
          status: "Error",
          message: error.message,
        };
      },
    });
    return {
      result: result.data,
    };
  } catch (e) {
    return {
      status: "Error",
      message: error.message,
    };
  }
};
module.exports = { verifyContract };
