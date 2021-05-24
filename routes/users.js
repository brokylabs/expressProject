var express = require('express');
var router = express.Router();

// Import userSchema
const User    = require('../models/UserSchema')

// Login Page
router.get('/login', function(req, res, next) {
  res.render('login', { title : 'Login Page'})
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
