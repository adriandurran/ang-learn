var mongoose = require('mongoose');

var poserSchema = mongoose.Schema({
	username: {type: String, required: true},
	body: {type: String, required: true},
	date: {type: Date, required: true, default: Date.now}
});

module.exports = mongoose.model('Poser', poserSchema);
