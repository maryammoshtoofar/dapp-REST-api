const mysql = require("mysql");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { validatePassword } = require("../../utils");
// Create DB connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "invest",
});
// Connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL connected");
});
let selectColumn = `SELECT refreshToken from users`;
db.query(selectColumn, (err, res) => {
  if (err && err.sqlState === "42S22")
    db.query("ALTER table users ADD COLUMN refreshToken varchar(255)");
});

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and Password are required" });
  let sql = "SELECT * from users";
  let Admin, isAdmin;
  db.query(sql, async (err, users) => {
    if (err) throw err;
    const foundUser = users.find((user) => (user.is_admin = "Yes"));
    Admin = await foundUser;
    isAdmin = await validatePassword(password, Admin.password);
    if (Admin.UserName !== username) return res.sendStatus(401); //Unauthorized
    // evaluate password
    if (isAdmin) {
      //create JWTs
      const accessToken = jwt.sign(
        { username: foundUser.UserName },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30s" }
      );
      const refreshToken = jwt.sign(
        { username: foundUser.UserName },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      let sql = `UPDATE users SET refreshToken = '${refreshToken}' WHERE UserName = '${foundUser.UserName}'`;
      db.query(sql, (err) => {
        if (err) throw err;
      });
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({ accessToken });
    } else {
      res.status(401).json({ message: "Wrong Password" });
    }
  });
};

module.exports = { handleLogin };
