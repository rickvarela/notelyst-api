const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

const withAuth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).send('Unauthorized: no token provided');
  } else {
    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        res.status(401).send('Unauthorized: invalid token');
      } else {
        console.log(decoded);
        req.username = decoded.username;
        next();
      }
    });
  }
};

module.exports = withAuth;
