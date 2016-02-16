var express = require('express');
var bodyParser = require('body-parser');
var Post = require('./models/post');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/social', function() {
	console.log('mongodb connected');
});

var app = express();
app.use(bodyParser.json());

app.get('/api/posts', function(req, res) {
	res.json([
			{
				username: 'adrian66',
				body: 'Node is the best!'
			},
			{
				username: 'bigboy99',
				body: 'Angular really works for me!!'
			}
		]);
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
