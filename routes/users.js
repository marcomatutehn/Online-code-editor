var express = require('express');
var router = express.Router();

//Login
router.get('/login', function(req, res){
	res.render('login');
});

// Register Homepage
router.get('/register', function(req, res){
	res.render('register');
});


module.exports = router;
