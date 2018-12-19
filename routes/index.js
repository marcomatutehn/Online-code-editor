var express = require('express');
var router = express.Router();

// Get Homepage
router.get('/',function(req, res){
	res.render('index');
});

/*
function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}
*/

module.exports = router;

/*
module.exports = function(app, passport) {
 
//GET login page. 
router.get('/', function(req, res) {
// Display the Login page with any flash message, if any
res.render('index', { message: req.flash('message') });
});

//Handle Login POST 
router.post('/login', passport.authenticate('login', {
successRedirect: '/home',
failureRedirect: '/',
failureFlash : true 
}));

//GET Registration Page 
router.get('/signup', function(req, res){
res.render('register',{message: req.flash('message')});
});

 //Handle Registration POST 
router.post('/signup', passport.authenticate('signup', {
successRedirect: '/home',
failureRedirect: '/signup',
failureFlash : true 
}));

router.get('/logout', function(req,res){
req.logout();
res.redirect('/login');
})
};

function isLoggedIn(req, res, next){
 if(req.isAuthenticated())
  return next();

 res.redirect('/');
 
}
 
//return router;
*/




