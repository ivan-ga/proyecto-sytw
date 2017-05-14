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
    ganadas: Number,
    perdidas: Number,
    totales:Number,
    empatadas:Number,
  },/*
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
  },*/
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
