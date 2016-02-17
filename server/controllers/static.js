var express = require('express');
var router = express.Router();

router.use(express.static(__dirname + '/../templates'));

module.exports = router;
