const { stakingFactoryContract, wallet } = require("../constants");

const deleteContract = async ({ min, max, month }) => {
  const gas = await stakingFactoryContract.methods
    .deleteContract(address)
    .estimateGas({ from: wallet.address });

  const result = await stakingFactoryContract.methods
    .deleteContract(address)
    .send({ from: wallet.address, gas: gas });
  return { result };
};

module.exports = { deleteContract };
