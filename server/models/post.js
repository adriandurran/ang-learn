var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
	username: {type: String, required: true},
	body: {type: String, required: true},
	date: {type: Date, required: true, default: Date.now}
});

module.exports = mongoose.model('Post', postSchema);

