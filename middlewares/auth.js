var jwt = require('jsonwebtoken');

// define authentication check
const authenticate = function(req, res, next) {
    if(!req.headers.hasOwnProperty('authorization')){
      next(createError(401));
    }
    else {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      // TODO check if token is authentic
      next();
    }
  }

module.exports = authenticate;