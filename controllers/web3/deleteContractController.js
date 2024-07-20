const { stakingFactoryContract } = require("../../constants");
const { getGasPriceApi } = require("../../utils");

const deleteContract = async (address) => {
  try {
    const { maxFeePerGas, maxPriorityFeePerGas } = await getGasPriceApi();
    const tx = await stakingFactoryContract.deleteStakingContract(address, {
      maxFeePerGas,
      maxPriorityFeePerGas,
    });
    return tx;
  } catch (error) {
    return error.message;
  }
};

module.exports = { deleteContract };
