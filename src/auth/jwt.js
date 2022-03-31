const jwt = require('jsonwebtoken');
const errors = require('../util/errors');
require('dotenv').config();

const jwtConfig = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

const validate = async (req, _res, next) => {
  const token = req.headers.authorization;
  if (!token) return next(errors.missingToken.error);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.employee = { email: decoded.email };
    next();
  } catch (err) {
    return next({ status: 401, message: errors.invalidToken.error.message });
  }
};

const generate = async (credential) => {
  const token = jwt.sign(credential, process.env.JWT_SECRET, jwtConfig);
  return token;
};

module.exports = { validate, generate };
