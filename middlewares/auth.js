// include http-errors
var createError = require('http-errors');
var jwt = require('jsonwebtoken');

// define authentication check
const authenticate = function(req, res, next) {
    if(!Object.prototype.hasOwnProperty.call(req.headers,'authorization')){
      next(createError(401));
    }
    else {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      // check if token is authentic
      try {
        const decode = jwt.verify(token, process.env.TOKEN_SECRET);
        if (decode) {
          // set decoded username in req body
          req.body.username = decode.username;
          next();
        } else {
          next(createError(401));
        }
      } catch (err) {
        next(createError(401));
      }
    }
};

const isAdmin = function(req, res, next) {
  next();
  if(!Object.prototype.hasOwnProperty.call(req.headers,'authorization')){
    next(createError(401));
  }
  else {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    // check if token is authentic
    try {
      const decode = jwt.verify(token, process.env.TOKEN_SECRET);
      if (decode && decode.username == 'admin') {
        // set decoded username in req body
        next();
      } else {
        next(createError(403));
      }
    } catch (err) {
      next(createError(401));
    }
  }
};

function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '3600s' });
}

module.exports = { authenticate, isAdmin, generateAccessToken };