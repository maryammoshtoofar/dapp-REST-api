const { rewardRatios } = require("./constants");
const calcRewardRatio = (min, max, month) => {
  return rewardRatios[`_${min}to${max}`][`_${month}`] * 100;
};

const monthtoSecond = (month) => {
  return month * 2629746;
};

module.exports = { calcRewardRatio, monthtoSecond };
