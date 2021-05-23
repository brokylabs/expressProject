var express = require('express');
const { route } = require('./users');
var router = express.Router();

// Welcome Page
router.get('/', function(req, res, next) {
  res.render('welcome', { title: 'Welcome Page' });
});

// Dashboard Page
router.get('/dashboard', function(req, res, next){
  res.render('dashboard', { title : 'Dashboard Page' })
})

module.exports = router;
