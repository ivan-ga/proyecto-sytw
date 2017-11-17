var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signup', function(req, res) {
  res.render('signup.ejs', { message: req.flash('signupMessage') });
});

router.get('/home', isLoggedIn, function(req, res) {
  console.log("estoy akiii")
  res.render('home.ejs', { user: req.user });
});


router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/games', isLoggedIn, function(req, res) {
  res.render('games.ejs', { user: req.user,title: "Ppepepp" });
});
router.post('/games', isLoggedIn, function(req, res) {
  res.render('games.ejs', { user: req.user,title: "Ppepepp" });
});

router.get('/r_tresenraya', isLoggedIn, function(req, res) {
  res.render('r_tresenraya.ejs', { user: req.user,title: "Ppepepp" });
});
router.post('/r_tresenraya', isLoggedIn, function(req, res) {
  res.render('r_tresenraya.ejs', { user: req.user,title: "Ppepepp" });
});




router.post('/registro', passport.authenticate('local-signup', {
  successRedirect: '/home',
  failureRedirect: '/',
  failureFlash: true,
}));

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/home',
  failureRedirect: '/',
  failureFlash: true,
}));

router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/home',
  failureRedirect: '/',
}));

router.get('/auth/twitter', passport.authenticate('twitter'));

router.get('/auth/twitter/callback', passport.authenticate('twitter', {
  successRedirect: '/home',
  failureRedirect: '/',
}));

router.get('/login/github', passport.authenticate('github', { scope: ['profile', 'email'] }));

router.get('/login/github/return', passport.authenticate('github', {
  successRedirect: '/home',
  failureRedirect: '/',
}));


module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
      return next();
  res.redirect('/');
}
