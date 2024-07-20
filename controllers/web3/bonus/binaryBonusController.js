const { genealogyContract } = require("../../../constants");

const binaryBonuses = async () => {
  try {
    const tx = await genealogyContract.binaryBonus();
    return tx;
  } catch (error) {
    return error.message;
  }
};

module.exports = { binaryBonuses };
