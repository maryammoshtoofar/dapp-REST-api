
const BigNumber = require("bignumber.js");
const { calcRewardRatio, monthtoSecond } = require("../utils");
const {
  dappTokenContract,
  stakingFactoryContract,
  dappTokenContractAddress,
  wallet
} = require("../constants")
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

  module.exports = {generateNewContract}