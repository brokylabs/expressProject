const express           = require('express');
const { Mongoose } = require('mongoose');
const { route } = require('./users');
const router            = express.Router();

// Get All Movies 
router.get('/', function(req, res, next){
    res.render('movie/allMovies', { title : 'Get Movies Page'})
})

// Create Movies 
router.get('/create', function(req, res, next){
    res.render('movie/createMovies', { title : 'Create Movie page'})
})

// Update Movies
router.get('/update/:movieid', function(req, res, next){
    res.render('movie/updateMovies', { title : 'Update Movie Page', movieid: req. params.movieid})
})

// Action Create 
router.post('/create', function(req, res){

})

// Action Update
router.put('/update/:movieid', function(req, res){

})

// Action Delete
router.delete('/delete/:movieid', function(req, res){

})


module.exports = router;