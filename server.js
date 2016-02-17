var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');

mongoose.connect('mongodb://localhost/social', function(err) {
	if (err) {throw err;}
	console.log('mongodb connected');
});

var app = express();
app.use(bodyParser.json());

app.use(express.static(__dirname + '/client'));
app.use(morgan('dev'));

app.use(require('./server/auth'));
app.use(require('./server/controllers/api/posts'));
app.use(require('./server/controllers/api/sessions'));
app.use(require('./server/controllers/api/users'));

app.get('/', function(req, res) {
	res.sendFile('./client/layout/app.html',  { root : __dirname});
});


app.listen(3000, function() {
	console.log('Server listening on' , 3000);
});
