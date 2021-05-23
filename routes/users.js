var express = require('express');
var router = express.Router();

// Login Page
router.get('/login', function(req, res, next) {
  res.render('login', { title : 'Login Page'})
});

// Register Page
router.get('/register', function(req, res, next){
  res.render('register', { title : 'Register Pages '})
})
module.exports = router;
