var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer')
var port = process.env.PORT || 8080;

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var mongoose = require('mongoose');
var flash = require('connect-flash');
var session = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');
//var upload = require('./routes/upload');



var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'shhsecret', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./config/passport')(passport);

app.use('/', routes);
app.use('/users', users);
//app.use('/upload', upload)

const conexionBD = require('./config/database.js');
mongoose.connect(conexionBD.url);

//Importando esquemas de BD
const Estructura = require('./models/user.js');
const userSchema = Estructura.User;

const User = mongoose.model("User", userSchema);

app.get('/m', (request, response) => {

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



app.get('/ranking', (req, res) => {

 User.find().sort('-local.ganadas_3enraya').find( function(err,data)
  {
      if(err)  console.error("Error:"+err);

        res.render("ranking",{users: data,title: "Otro"})
    })


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

app.post('/home', function(req, res) {
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

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}



app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

app.listen(port);

module.exports = app;
