
const JWT = require('jsonwebtoken');

const authorizationFunc = (req, res, next) => {
    // const token = req?.headers.authorization?.split(" ")[1];
    const token = req.cookies.jwt;

    // console.log("token is from : ", token);
    if (!token) {
      res.status(403).send("JWT Error Not Token");
    }
    JWT.verify(token, "generate", (err, user) => {
      if (err) {
        console.log("JWT Cant Work : ", err);
        return res.status(401).json({ "JWT Error : ": err });
      }
      // write user to req.user
      req.user = user;
      next();
    });
  };

  module.exports = authorizationFunc;