const { dappTokenContract, getDecimals } = require("../../constants");
const { getGasPriceApi } = require("../../utils");

const transferToken = async (amount, receiver) => {
  const { maxFeePerGas, maxPriorityFeePerGas } = await getGasPriceApi();
  try {
    const decimal = await getDecimals();
    const value = amount * Math.pow(10, decimal);
    const tx = await dappTokenContract.transfer(receiver, value, {
      maxFeePerGas,
      maxPriorityFeePerGas,
    });
    return tx;
  } catch (error) {
    return error.message;
  }
};

module.exports = { transferToken };
