var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var User = require('../models/user.model');

// Store this user's unique id in the session for later reference
// Only runs during authentication
// Stores info on req.session.passport.user
passport.serializeUser(function(user, done) {
  console.log('serialized: ', user);
  done(null, user.id);
});

// Runs on every request after user is authenticated
// Look up the user's id in the session and use it to find them in the DB for each request
// result is stored on req.user
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    if(err) {
      done(err);
    }

    console.log('-----------------------------------------------\ndeserialized: ', user.id);
    done(null, user);
  });
});


// Logging on
passport.use('local', new localStrategy({
  passReqToCallback: true,
  usernameField: 'username'
  }, function(req, username, password, done) {
    User.findOne({username: username}, function(err, user) {
      if(err) {
        throw err;
      }


      if(!user) {
        // user not found in mongo
        console.log('userStrategy.js :: no user found');
        return done(null, false, {message: 'Incorrect credentials.'});
      } else {
        // user found - check password
        user.comparePassword(password, function(err, isMatch) {
          if(err) {
            throw err;
          }

          if(isMatch) {
            // populate user object on the session through serializeUser
            console.log('userStrategy.js :: all good');
            return(done(null, user));
          } else {
            // no good.
            console.log('userStrategy.js :: password incorrect');
            done(null, false, {message: 'Incorrect credentials.'});
          }
        });
      } // end else
    }); // end findOne
  } // end callback
));

module.exports = passport;
