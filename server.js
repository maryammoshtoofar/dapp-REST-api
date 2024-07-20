require("dotenv").config();

const express = require("express");

const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");
const { logger } = require("./middleware/logEvents");
const { serveStaticFiles } = require("./utils");
const { routes, port } = require("./constants");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");

// Custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);
// Cross Origin Resource Sharing middleware
app.use(cors(corsOptions));
// Other middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

serveStaticFiles(app, routes);
// routes

// authorize  user
app.use("/auth", require("./routes/auth"));

// issue a new access token
app.use("/refresh", require("./routes/refresh"));

app.use(verifyJWT);
// Check api health
app.use("/health", require("./routes/health"));

// Transfer tokens api from Admin wallet
app.use("/transfer", require("./routes/web3/transfer"));

// Transfer tokens api from any wallet
// Implement if needed

// Generate a new contract
app.use("/build-new-contract", require("./routes/web3/buildContract"));

// Verify contract
// Implement if needed

//Delete a contract
app.use("/delete-contract", require("./routes/web3/deleteContract"));

//Update Uplines Unilevel rewards
app.use(
  "/update-upline-unilevel",
  require("./routes/web3/bonus/updateUplinesUnilevel")
);

//Binary Bonus
app.use("/binary-bonus", require("./routes/web3/bonus/binaryBonus"));

//Issue Rewards
app.use("/issue-rewards", require("./routes/web3/bonus/issueRewards"));

app.all("*", notFound);

app.use(errorHandler);
app.listen(port, () => {
  console.log(`web server listening on port ${port}`);
});
