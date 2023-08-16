const { web3, dappTokenContract, wallet } = require("../constants");

const transferToken = async (amount, receiver) => {
  const decimal = await dappTokenContract.methods.decimals().call();
  const value = amount * Math.pow(10, decimal);
  const gas = await dappTokenContract.methods
    .transfer(receiver, value)
    .estimateGas({ from: wallet.address });
  try {
    const res = await dappTokenContract.methods.transfer(receiver, value).send({
      from: wallet.address,
      gas: gas,
    });
    return res;
  } catch (error) {
    return error.message;
  }
};

module.exports = { transferToken };
