var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var Strategy = require('passport-github').Strategy;

var User = require('../models/user');
var configAuth = require('./auth');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
  },
  function(req, username, password, done) {
    process.nextTick(function() {
      User.findOne({ 'local.username':  username }, function(err, user) {
        if (err)
            return done(err);
        if (user) {
          return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
        } else {
          var newUser = new User();
          newUser.local.username = username;
          newUser.local.password = newUser.generateHash(password);
          newUser.local.ganadas = 0;
          newUser.local.perdidas = 0;
          newUser.local.totales = 0;
          newUser.local.empatadas = 0;
          newUser.local.name = username;
          newUser.save(function(err) {
            if (err)
              throw err;
            return done(null, newUser);
          });
        }
      });
    });
  }));

  passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
  },
  function(req, username, password, done) {
    User.findOne({ 'local.username':  username }, function(err, user) {
      if (err)
          return done(err);
      if (!user)
          return done(null, false, req.flash('loginMessage', 'No user found.'));
      if (!user.validPassword(password))
          return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
      return done(null, user);
    });
  }));

  passport.use(new FacebookStrategy({
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL,
    profileFields: ['id', 'email', 'first_name', 'last_name'],
  },
  function(token, refreshToken, profile, done) {
    console.log(profile);
    process.nextTick(function() {
      User.findOne({ 'local.id': profile.id }, function(err, user) {
        if (err)
          return done(err);
        if (user) {
          return done(null, user);
        } else {
          var newUser = new User();
          newUser.local.id = profile.id;
        //  newUser.local.username = profile.name.givenName + ' ' + profile.name.familyName;
          newUser.local.token = token;
          newUser.local.username_facebook = profile.name.givenName + ' ' + profile.name.familyName;
          newUser.local.email = (profile.emails[0].value || '').toLowerCase();
          newUser.local.empatadas = 0;
          newUser.local.ganadas = 0;
          newUser.local.perdidas = 0;
          newUser.local.totales = 0;
          newUser.local.name = profile.name.givenName;


          newUser.save(function(err) {
            if (err)
              throw err;
            return done(null, newUser);
          });
        }
      });
    });
  }));

  passport.use(new TwitterStrategy({
    consumerKey: configAuth.twitterAuth.consumerKey,
    consumerSecret: configAuth.twitterAuth.consumerSecret,
    callbackURL: configAuth.twitterAuth.callbackURL,
  },
  function(token, tokenSecret, profile, done) {

    process.nextTick(function() {
      User.findOne({ 'local.id': profile.id }, function(err, user) {
        if (err)
          return done(err);
        if (user) {
          return done(null, user);
        } else {
          var newUser = new User();
          newUser.local.id          = profile.id;
          newUser.local.token       = token;
          newUser.local.username_twitter    = profile.username;
          newUser.local.displayName = profile.displayName;
          newUser.local.fotos = profile.photos.value;
          newUser.local.ganadas = 0;
          newUser.local.perdidas = 0;
          newUser.local.totales = 0;
          newUser.local.empatadas = 0;
          newUser.local.name = profile.username;


          newUser.save(function(err) {
            if (err)
             throw err;
            return done(null, newUser);
          });
        }
      });
    });
  }));


passport.use(new Strategy({
  clientID: configAuth.githubAuth.clientID,
  clientSecret: configAuth.githubAuth.clientSecret,
  callbackURL: configAuth.githubAuth.callbackURL,
  profileFields: ['id', 'email', 'first_name', 'last_name'],

},
function(token, tokenSecret, profile, done) {
  console.log(profile.username);
    process.nextTick(function() {


      User.findOne({ 'local.id': profile.id }, function(err, user) {

        if (err)
          return done(err);
        if (user) {
          return done(null, user);
        } else {
          var newUser = new User();
          newUser.local.id          = profile.id;
          newUser.local.token       = token;
          newUser.local.username_github    = profile.username;
          newUser.local.displayName = profile.displayName;
          newUser.local.email = (profile.emails[0].value || '').toLowerCase();
          newUser.local.ganadas = 0;
          newUser.local.perdidas = 0;
          newUser.local.totales = 0;
          newUser.local.empatadas = 0;
          newUser.local.name = profile.username;
          newUser.save(function(err) {
            if (err)
             throw err;
            return done(null, newUser);
          });
        }
      });
    });
  }));
};
