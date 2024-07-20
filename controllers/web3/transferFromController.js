// still a work in progress

const { dappTokenContract, getDecimals } = require("../../constants");
const { getGasPriceApi } = require("../../utils");

const transferFrom = async (amount, sender, receiver) => {
  const { maxFeePerGas, maxPriorityFeePerGas } = await getGasPriceApi();
  try {
    const decimal = await getDecimals();
    const value = amount * Math.pow(10, decimal);
    await dappTokenContract.increaseAllowance(sender, value);
    const tx = await dappTokenContract.transferFrom(sender, receiver, value, {
      maxFeePerGas,
      maxPriorityFeePerGas,
    });
    return tx;
  } catch (error) {
    return error.message;
  }
};

module.exports = { transferFrom };
