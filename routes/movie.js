const express           = require('express');
const router            = express.Router();
const Movies            = require('../models/MovieSchema')
const moment            = require('moment')

// Get All Movies 
router.get('/', function(req, res, next){
    let listMovies = [];
    Movies.find(function(err, movies){
        if(movies){
            for(let data of movies){
                listMovies.push({
                    id : data._id,
                    name : data.name,
                    released_on : data.released_on
                })
            }
            res.render('movie/allMovies', {listMovies})
        }
        else {
            listMovies.push({
                id : '',
                name : '',
                released_on : ''
            });
            res.render('movie/allMovies', {listMovies})
        }
    })
    // res.render('movie/allMovies', { title : 'Get Movies Page'})
})

// Create Movies 
router.get('/create', function(req, res, next){
    res.render('movie/createMovies', { title : 'Create Movie page'})
})

// Update Movies
router.get('/update/:movieId', function(req, res, next){
    Movies.findById(req.params.movieId, function(err, movieInfo){

        var newDate = moment(movieInfo.released_on).format("YYYY-MM-DD");
      
        if (movieInfo){
            console.log(movieInfo);
            res.render('movie/updateMovies', {
                movies : movieInfo,
                newDate,
                
            })
            console.log("Database :" + movieInfo.released_on);
            console.log("MomentJS : " + newDate);
        }
    })
})

// Action Create 
router.post('/create', function(req, res){
    // console.log(req.body);
    const {name, date} = req.body

    let errors = [];
    if(!name || !date){
        errors.push({ msg : 'Silahkan Lengkapi Data yang dibutuhkan'})
    }

    if(errors.length > 0){
        res.render('movie/createMovies', {errors});
    } else {
        const newMovie = Movies({
            name,
            released_on : date
        })
        newMovie.save().then(
            movie => {
                errors.push({msg : 'Data Movies Berhasil di tambah'})
                res.render('movie/createMovies', {errors})
            }
        ).catch(err => console.log(err))
    }
})

// Action Update
router.post('/update', function(req, res){
    
    let errors = [];

    Movies.findOneAndUpdate(req.body.id, {name : req.body.name, released_on : req.body.date },
        function(err){
            if(err){
                console.log(err);
            } else {
                errors.push({msg : 'Data Berhasil Di Update!'});
                var newMovie = {_id : req.body.id, name : req.body.name }
                var newDate = moment(req.body.date).format("YYYY-MM-DD");
                res.render('movie/updateMovies',{
                    movies : newMovie,
                    newDate,
                    errors
                })
            }
        })
})

// Action Delete
router.get('/delete/:movieId', function(req, res){
    Movies.findByIdAndDelete(req.params.movieId, function(){
        res.redirect('/movies')
    })
})


module.exports = router;