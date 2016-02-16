var express = require('express');
var bodyParser = require('body-parser');
var Post = require('./server/models/post');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/social', function() {
	console.log('mongodb connected');
});

var app = express();
app.use(bodyParser.json());


app.use(express.static(__dirname + '/client'));


app.get('/', function(req, res) {
	res.sendFile('client/layout/posts.html',  { root : __dirname});
});

app.get('/api/posts', function(req, res, next) {
	Post.find(function(err, posts) {
		if (err) {return next(err);}
		res.json(posts);
	});
});

app.post('/api/posts', function(req, res) {
	var post = new Post({
		username: req.body.username,
		body: req.body.body
	});
	post.save(function(err, post) {
		if (err) {return next(err);}
		res.status(201).json(post);
	});
});

app.listen(3000, function() {
	console.log('Server listening on' , 3000);
});
