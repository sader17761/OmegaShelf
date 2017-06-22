var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());

mongoose.connect('localhost:27017/OmegaShelf');

var itemSchema = new mongoose.Schema({
    description: String,
    placer: String,
    imageUrl: String
});

var items = mongoose.model('items', itemSchema);

router.post( '/', function( req, res) {
  console.log( 'in items.js, post to /, req.body is:', req.body);
  items(req.body).save();
  res.send(200);
});

router.get( '/', function( req, res) {
  console.log( 'in items.js, get to /, req.body is:', req.body);
  items.find().then(function( response ) {
    res.send(response);
  });
});

module.exports = router;
