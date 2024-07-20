const { stakingFactoryContract } = require("../../../constants");

const issueReward = async () => {
  try {
    const tx = await stakingFactoryContract.issueRewards();
    return tx;
  } catch (error) {
    return error.message;
  }
};

module.exports = { issueReward };
