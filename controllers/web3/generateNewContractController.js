const {
  calcRewardRatio,
  monthtoSecond,
  getGasPriceApi,
} = require("../../utils");
const {
  stakingFactoryContract,
  dappTokenContractAddress,
  getDecimals,
} = require("../../constants");
const generateNewContract = async ({ min, max, month }) => {
  const rewardRatio = calcRewardRatio(min, max, month);
  const duration = monthtoSecond(month);
  const rewardDuration = 2592000;
  const { maxFeePerGas, maxPriorityFeePerGas } = await getGasPriceApi();
  try {
    const decimal = await getDecimals();
    const minDeposit = min * Math.pow(10, decimal);
    const maxDeposit = max * Math.pow(10, decimal);
    const tx = await stakingFactoryContract.newStakingContract(
      dappTokenContractAddress,
      duration,
      rewardDuration,
      minDeposit,
      maxDeposit,
      rewardRatio,
      {
        maxFeePerGas,
        maxPriorityFeePerGas,
      }
    );
    return tx;
  } catch (error) {
    return error.message;
  }
};

module.exports = { generateNewContract };
