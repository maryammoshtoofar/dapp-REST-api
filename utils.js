const { rewardRatios, APIKey } = require("./constants");
const ethers = require("ethers");
const axios = require("axios");
const express = require("express");
const path = require("path");
var bcrypt = require("bcrypt");
const calcRewardRatio = (min, max, month) => {
  return rewardRatios[`_${min}to${max}`][`_${month}`] * 100;
};

const monthtoSecond = (month) => {
  return month * 2629746;
};

const getGasPriceApi = async () => {
  let maxFeePerGas = 40000000000n; // fallback to 40 gwei
  let maxPriorityFeePerGas = 40000000000n; // fallback to 40 gwei
  try {
    const { data } = await axios({
      method: "get",
      url: `https://api.polygonscan.com/api?module=gastracker&action=gasoracle&apikey=${APIKey}`,
    });
    maxFeePerGas = ethers.parseUnits(
      Math.ceil(data.result.FastGasPrice) + "",
      "gwei"
    );
    maxPriorityFeePerGas = ethers.parseUnits(
      Math.ceil(data.result.ProposeGasPrice) + "",
      "gwei"
    );
  } catch (e) {
    return e.message;
  }

  return { maxFeePerGas, maxPriorityFeePerGas };
};

const serveStaticFiles = (app, routes) => {
  app.use(express.static(path.join(__dirname, "/public")));
  for (let route of routes) {
    app.use(route, express.static(path.join(__dirname, "/public")));
  }
};
const validatePassword = async (password, dbPassword) => {
  var hash = dbPassword.replace(/^\$2y(.+)$/i, "$2a$1");
  const result = await bcrypt.compare(password, hash);
  return result;
};
module.exports = {
  calcRewardRatio,
  monthtoSecond,
  getGasPriceApi,
  serveStaticFiles,
  validatePassword,
};
