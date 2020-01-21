const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const db = mongoose.connection;

const userSchema = new Schema({
  userName : {type: String, required: true}, 
  avatar: {type: String},
  location: {type: String, required: true},
  userType: {type: String, required: true},
  score: {type: Number, required: true, default: 0}, 
  questionsCorrect: {type: Number, required: true, default: 0}, 
  questionsTotal: {type: Number, required: true}, 
  languages: {type: String, required: true, default: "none"}, 
  date: { type: Date, default: Date.now }, 
});

const User = mongoose.model("User", userSchema);

//new user function
module.exports.createUser = function(newUser, callback){
  bcrypt.genSalt(10, function(err, salt){
    bcrypt.hash(newUser.password, salt, function(err, hash) {
  //store password in password db
  newUser.password = hash;
  newUser.save(callback);
    });
  });
}

module.exports = User;
