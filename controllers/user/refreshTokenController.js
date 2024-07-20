const jwt = require("jsonwebtoken");
const mysql = require("mysql");
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
});

const handleRefreshToken = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  let sql = "SELECT * from users";

  db.query(sql, async (err, users) => {
    if (err) throw err;
    const foundUser = users.find((user) => (user.is_admin = "Yes"));
    // evaluate jwt
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || foundUser.UserName !== decoded.username) {
          return res.sendStatus(403);
        }
        const accessToken = jwt.sign(
          { username: decoded.username },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "30s" }
        );
        res.json({ accessToken });
      }
    );
  });
};

module.exports = { handleRefreshToken };
