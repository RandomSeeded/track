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

module.exports = {
  ensureAuthenticated,
};
