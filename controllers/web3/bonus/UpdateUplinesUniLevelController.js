const { genealogyContract } = require("../../../constants");
const { getGasPriceApi } = require("../../../utils");

const updateUplinesUniLevel = async (id) => {
  const { maxFeePerGas, maxPriorityFeePerGas } = await getGasPriceApi();
  try {
    const tx = await genealogyContract.updateUplinesUniLevelRewards(id, {
      maxFeePerGas,
      maxPriorityFeePerGas,
    });
    return tx;
  } catch (error) {
    return error.message;
  }
};

module.exports = { updateUplinesUniLevel };
