var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
  local: {
    id: String,
    name:String,
    username: String,
    username_facebook:String,
    username_twitter:String,
    username_github:String,
    email: String,
    password: String,
    ganadas_3enraya: Number,
    perdidas_3enraya: Number,
    totales_3enraya:Number,
    empatadas_3enraya:Number,
    ganadas_ajedrez: Number,
    perdidas_ajedrez: Number,
    totales_ajedrez:Number,
    empatadas_ajedrez:Number,
    ganadas_damas: Number,
    perdidas_damas: Number,
    totales_damas:Number,
    empatadas_damas:Number,
    ganadas_buscaminas: Number,
    perdidas_buscaminas: Number,
    totales_buscaminas:Number,
    empatadas_buscaminas:Number,
  },
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String,
    username: String,
  },
  twitter: {
    id: String,
    token: String,
    displayName: String,
    username: String,
  },
  github: {
    id: String,
    token: String,
    displayName: String,
    username: String,
    email: String,
  },
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
