var mongoose = require( 'mongoose' );

mongoose.connect('mongodb://heroku_g719pp6x:hl47s24rif9k8mr115os279has@ds155718.mlab.com:55718/heroku_g719pp6x');
//localhost:27017/OmegaShelf

var userSchema = new mongoose.Schema({
  username: String,
  password: String
});

var userModel = mongoose.model( 'userModel', userSchema);

module.exports = userModel;
