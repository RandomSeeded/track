'use strict';

function ensureAuthenticated(req, res, next) {
  if (process.env.NODE_ENV === 'dev') {
    req.user = { googleId: '101568670801818828933' }; // temp hack - hardcode a user
    return next();
  }

  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/auth/google');
}

function isAuthenticated(req) {
  if (process.env.TEST_NON_AUTHENTICATED === 'true') {
    return false;
  }

  if (process.env.NODE_ENV === 'dev') {
    return true;
  }

  console.log('req.isAuthenticated', req.isAuthenticated());
  if (req.isAuthenticated()) {
    return true;
  }
  return false;
}

module.exports = {
  ensureAuthenticated,
  isAuthenticated,
};
