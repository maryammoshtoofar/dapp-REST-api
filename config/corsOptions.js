const whiteList = require("./whiteList");

require("dotenv").config();
// Cross Origin Resource Sharing


const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionSuccessStatus: 200,
};
module.exports = corsOptions;
