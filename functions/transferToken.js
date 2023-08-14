const { web3, dappTokenContract, wallet } = require("../constants");

const transferToken = async (amount, receiver) => {
  const value = web3.utils.toWei(String(amount));
  const gas = await dappTokenContract.methods
    .transfer(receiver, value)
    .estimateGas({ from: wallet.address });
  try {
    const res = await dappTokenContract.methods
      .transfer(receiver, value)
      .send({ from: wallet.address, gas: gas });
    return res;
  } catch (error) {
    return error.message;
  }
};

module.exports = { transferToken };
