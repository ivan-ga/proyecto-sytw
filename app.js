var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var port = process.env.PORT || 8080;

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var mongoose = require('mongoose');
var flash = require('connect-flash');
var session = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');

//var configDB = require('./config/database.js');
//mongoose.connect(configDB.url);

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
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

const conexionBD = require('./config/database.js');
mongoose.connect(conexionBD.url);

//Importando esquemas de BD
const Estructura = require('./models/user.js');
const userSchema = Estructura.User;
//const MapaSchema = Estructura.Mapa;
//console.log("Estructura:"+Estructura);
//console.log("User:"+UserSchema);
//console.log("Mapa:"+MapaSchema);
const User = mongoose.model("User", userSchema);
//const Mapa = mongoose.model("Mapa", MapaSchema);

app.get('/m', (request, response) => {
    console.log(request._passport.instance.Authenticator._strategies);
    User.find({
    },{}, function(err,data)
    {
        if(err)  console.error("Error:"+err);



        else
        {
          //console.log(data);
              if( request.query.ganadas != undefined){
              console.log("Data_creator:");
                    for (var i = data.length - 1; i >= 0; i--) {
                      
                        if(data[i].local.id!= null ){
                        console.log(data[i].local);
                      
                         let gan= request.query.ganadas;
                         console.log("tienes"+gan);
                          console.log("Data_creator:"+data[i].id);
                          console.log("Data_creator:"+data[i].local.ganadas);
                          User.update({"local.id": data[i].local.id}, {$inc: {"local.ganadas":1,"local.totales":1}},function(error,dato){
                            console.log("holaaaaaa");
                          });
                                       // console.log("Dat:"+data[i].local.username_twitter);
                          //db.users.update({"local.username_twitter":"alu0100"},{$set:{"local.ganadas":4 
                          //console.log("Datasssss_creator:"+data[i].local.ganadas);
                         // console.log();
                        }
                     }
                
              }
              if( request.query.perdidas != undefined){
              console.log("Data_creator:");
                    for (var i = data.length - 1; i >= 0; i--) {
                        if(data[i].local.id!= null){
                     
                      
                         
                          console.log("Data_creator:"+data[i].local.username_twitter);
                          console.log("Data_creator:"+data[i].local.perdidas);
                          User.update({"local.id": data[i].local.id}, {$inc: {"local.perdidas":1,"local.totales":1}},function(error,dato){
                            console.log("holaaaaaa");
                          });
                                       // console.log("Dat:"+data[i].local.username_twitter);
                          //db.users.update({"local.username_twitter":"alu0100"},{$set:{"local.ganadas":4 
                          console.log("Datasssss_creator:"+data[i].local.perdidas);
                          console.log();
                        }
                     }
                
              }
              if( request.query.empatadas != undefined){
              console.log("Data_creator:");
                    for (var i = data.length - 1; i >= 0; i--) {
                        if(data[i].local.id!= null){
                     
                      
                         
                          console.log("Data_creator:"+data[i].local.id);
                          console.log("Data_creator:"+data[i].local.empatadas);
                          User.update({"local.id": data[i].local.id}, {$set: {"local.empatadas":1,"local.totales":1}},function(error,dato){
                            console.log("holaaaaaa");
                          });
                                       // console.log("Dat:"+data[i].local.username_twitter);
                          //db.users.update({"local.username_twitter":"alu0100"},{$set:{"local.ganadas":4 
                          console.log("Datasssss_creator:"+data[i].local.empatadas);
                          console.log();
                        }
                     }
                
              }
        }
    });
/*
    User.update({
      request.query.ganadas},{id:local.id
    }
    console.log(id););
    console.log(request.query.ganadas);*/
});





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
