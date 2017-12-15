var express = require('express');
var path = require('path');
var passport = require('passport');
var mongoose = require('mongoose');
var multer = require('multer');
var router = express.Router();

//Importando esquemas de BD
const Estructura = require('../models/user.js');
const userSchema = Estructura.User;

const User = mongoose.model("User", userSchema);

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signup', function(req, res) {
  res.render('signup.ejs', { message: req.flash('signupMessage') });
});

router.get('/home', isLoggedIn, function(req, res) {
  res.render('home.ejs', { user: req.user });
});


router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/games', isLoggedIn, function(req, res) {
  res.render('games.ejs', { user: req.user,title: "Juegos" });
});

router.get('/rankings', isLoggedIn, function(req, res) {
  res.render('rankings.ejs', { user: req.user,title: "Rankings" });
});


router.get('/g_damas', isLoggedIn, function(req, res) {
  res.render('g_damas.ejs', { user: req.user,title: "Damas" });
});

router.get('/r_damas', isLoggedIn, function(req, res) {
  res.render('r_damas.ejs', { user: req.user,title: "Damas" });
});

router.get('/g_tresenraya', isLoggedIn, function(req, res) {
  res.render('g_tresenraya.ejs', { user: req.user,title: "3 en raya" });
});


router.get('/g_ajedrez', isLoggedIn, function(req, res) {
  res.render('g_ajedrez.ejs', { user: req.user,title: "Ajedrez" });
});

router.get('/g_buscaminas', isLoggedIn, function(req, res) {
  res.render('g_buscaminas.ejs', { user: req.user,title: "Buscaminas" });
});

router.get('/r_tresenraya', isLoggedIn, function(req, res) {
  User.find().sort('-local.ganadas_3enraya').find( function(err,data)
   {
       if(err)  console.error("Error:"+err);
        res.render('r_tresenraya.ejs', { user: data,title: "3 en raya" })
     })
});

router.get('/r_ajedrez', isLoggedIn, function(req, res) {
  User.find().sort('-local.ganadas_ajedrez').find( function(err,data)
   {
       if(err)  console.error("Error:"+err);
        res.render('r_ajedrez.ejs', { user: data,title: "Ajedrez" })
     })
});

router.get('/r_buscaminas', isLoggedIn, function(req, res) {
  User.find().sort('-local.ganadas_buscaminas').find( function(err,data)
   {
       if(err)  console.error("Error:"+err);
        res.render('r_buscaminas.ejs', { user: data,title: "Buscamnias" })
     })
});

router.get('/r_damas', isLoggedIn, function(req, res) {
  User.find().sort('-local.ganadas_damas').find( function(err,data)
   {
       if(err)  console.error("Error:"+err);
        res.render('r_damas.ejs', { user: data,title: "Damas" })
     })
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

// ### ACTUALIZAR ESTADÍSTICAS ###
router.get('/m', isLoggedIn, (request, response) => {

    User.find({}, function(err,data)
    {
        if(err)  console.error("Error:"+err);
        else
        {
              if( request.query.ganadas_3enraya != undefined){

                    for (var i = data.length - 1; i >= 0; i--) {
                          if( data[i].id === request.session.passport.user ){
                          User.update({"_id": data[i]._id}, {$inc: {"local.ganadas_3enraya":1,"local.totales_3enraya":1}},function(error,dato){
                          });
                    }
              }

              }
              if( request.query.perdidas_3enraya  != undefined){

                    for (var i = data.length - 1; i >= 0; i--) {
                        if(data[i].id === request.session.passport.user){
                          User.update({"_id": data[i]._id}, {$inc: {"local.perdidas_3enraya":1,"local.totales_3enraya":1}},function(error,dato){

                          });

                        }
                     }

              }
              if( request.query.empatadas_3enraya  != undefined){

                    for (var i = data.length - 1; i >= 0; i--) {
                        if(data[i].id === request.session.passport.user){

                          User.update({"_id": data[i]._id}, {$inc: {"local.empatadas_3enraya":1,"local.totales_3enraya":1}},function(error,dato){

                          });

                        }
                     }

              }
        }
    });

});

//////////////////////SUBIR IMAGEN PARA PERFIL DE USUARIO

var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, './public/img/uploads')
	},
	filename: function(req, file, callback) {
		callback(null, req.session.passport.user + path.extname(file.originalname))

	}
})

router.post('/home', isLoggedIn, function(req, res) {
  console.log("POST UPLOAD");
	var upload = multer({
		storage: storage,
		fileFilter: function(req, file, callback) {
			var ext = path.extname(file.originalname)
			if (ext !== '.jpg') {
				return callback(res.end('Only jpg images are allowed'), null)
			}
			callback(null, true)
		}
	}).single('userFile');
	upload(req, res, function(err) {

	})

	res.redirect('back'); //refresca la página después de cambiar la foto de perfil
})

//////////////////////TERMINADO SUBIR IMAGEN

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
      return next();
  res.redirect('/');
}
