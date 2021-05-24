var express = require('express');
var router = express.Router();
const bcrypt    = require('bcrypt')

// Import userSchema
const User    = require('../models/UserSchema')

// GET Login Page
router.get('/login', function(req, res, next) {
  res.render('login', { title : 'Login Page'})
});

// POST Login Page
router.post('/login', function(req, res, next) {
  const { email, password } = req.body

  console.log(req.body);
  let errors = [];
  if(!email || !password) {
    errors.push({msg : "Silahkan Lengkapi Data anda, Email & Password"})
    console.log("Silahkan Lengkapi Data anda, Email & Password");
  }
  if(errors.length > 0){
    res.render('login', {
      errors,
      email,
      password
    })
  } else {
    User.findOne({email : email}).then(
      async(user) => {
        if(user){
          if(await bcrypt.compare(password, user.password)){
            console.log(user);
            console.log('cek' + password + ' || ' + user.password);
            res.redirect('/dashboard')
          } else {
              errors.push({msg : "Password Anda Salah"})
              console.log("Password Anda Salah")
              res.render('login', {errors})
            } 
        }else {
          errors.push({msg : "Email Anda Salah"})
          console.log("Email Anda Salah")
          res.render('login', {errors})
        }
      } 
    ).catch((err) => {
      errors.push({msg : "Internal Server Error"})
      console.log("Internal Server Error " + err.message)
    })
  }
});



// Register Page
// Get Register
router.get('/register', function(req, res, next){
  res.render('register', { title : 'Register Pages '})
})

// Post Register Page
router.post('/register', function(req, res, next){
  // console.log(req.body);
  const {name, email, password, password2} = req.body
  console.log(req.body);

  let errors = [];
  if(!name || !email || !password || !password2){
    errors.push({msg : 'Silahkan Lengkapi data anda'});
    console.log('Silahkan Lengkapi data anda');
  }
  if(password != password2){
    errors.push({msg : 'Password Anda tidak sama'});
    console.log('Password Anda tidak sama');
  }
  if(errors.length > 0){
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    })
  } else {
    User.findOne({email : email}).then(
      user => {
        if(user){
          errors.push({msg : 'Email Sudah Terdaftar'})
          console.log('Email Sudah Terdaftar')
          res.render('register', {
            errors,
            name,
            email,
            password,
            password2
          });
        }else {
          const newUser = new User({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            })
            newUser.save(user).then(user => {
              console.log(user);
              console.log('Selamat anda berhasil Registrasi, Silahkan login');
              res.redirect('/auth/login')
          }).catch(err => console.log(err))
        }
      }
    )
  }
})



module.exports = router;
