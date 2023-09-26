const CryptoJs = require("crypto-js");

const hashPassword = (password) => {
  const hashing_password = CryptoJs.SHA256(
    password,
    process.env.PASSWORD_SECRET_KEY
  ).toString();
  return hashing_password;
};

module.exports = hashPassword;
