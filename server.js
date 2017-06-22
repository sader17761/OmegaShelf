var express = require( 'express' );
var app = express();
var index = require( './modules/routes/index');
// add extra routes when needed

app.use(express.static('public'));
app.use( '/', index);

var port = process.env.PORT || 1996;

app.listen( port, function() {
  console.log( 'server up on port:', port);
});
