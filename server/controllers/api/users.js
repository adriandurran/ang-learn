var router = require('express').Router(),
		User = require('../../models/user'),
		bcrypt = require('bcrypt'),
		jwt = require('jwt-simple'),
		config = require('../../../config');

router.get('/api/users', function(req, res, next) {
	if (!req.headers['x-auth']) {
		return res.status(401);
	}
	var auth = jwt.decode(req.headers['x-auth'], config.secret);
	User.findOne({username: auth.username}, function(err, user) {
		if (err) {return next(err);}
		res.json(user);
	});
});

router.post('/api/users', function(req, res, next) {
	var user = new User({username: req.body.username});
	bcrypt.hash(req.body.password, 10, function(err, hash) {
		if (err) { return next(err);}
		user.password = hash
		user.save(function(err) {
			if (err) {return next(err);}
			res.status(201);
		});
	});
});

module.exports = router;
