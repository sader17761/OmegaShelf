var express = require( 'express' );
var router = express.Router();
var path = require( 'path' );
var bcrypt = require( 'bcrypt' );
var bodyParser = require( 'body-parser' );
// var user = require( '../user' );  // add in user route

router.use( bodyParser.urlencoded({extended:true}));
router.use( bodyParser.json());

router.get('/', function(req, res){
  console.log('base url hit');
  res.sendFile(path.resolve('public/views/index.html'));
});

module.exports = router;
