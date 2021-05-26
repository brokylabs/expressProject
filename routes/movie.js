const express           = require('express');
const router            = express.Router();
const movies            = require('../models/MovieSchema')

// Get All Movies 
router.get('/', function(req, res, next){
    const listMovies = [];
    movies.find(function(err, movies){
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
            res.render('movie/all', {listMovies})
        }
    })
    // res.render('movie/allMovies', { title : 'Get Movies Page'})
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
    // console.log(req.body);
    const {name, date} = req.body

    let errors = [];
    if(!name || !date){
        errors.push({ msg : 'Silahkan Lengkapi Data yang dibutuhkan'})
    }

    if(errors.length > 0){
        res.render('movie/createMovies', {errors});
    } else {
        const newMovie = movies({
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
router.put('/update/:movieid', function(req, res){

})

// Action Delete
router.delete('/delete/:movieid', function(req, res){

})


module.exports = router;