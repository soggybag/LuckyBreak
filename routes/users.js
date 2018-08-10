// ==============================================================
//
// import Dependancies 
//
// ==============================================================

// --------------------------------------------------------------
// NPM Dependancies

const express = require('express');

// --------------------------------------------------------------
// Local Dependanncies

const Modelinfo = require('../models/modelinfo');

require('dotenv').config()

// --------------------------------------------------------------
// Define Router /users

const router = express.Router();
const talentauth = require('./helpers/talentauth')
//const multer = require('multer')
//const upload = multer()
var cloudinary = require('cloudinary');

cloudinary.config({ 
  cloud_name: 'lucky-break', 
  api_key: '924158175189213', 
  api_secret: 'ktI0M-FDFBZiZbkeqbOVSdhTLVg' 
});
// --------------------------------------------------------------
// Define routes 

// --------------------------------------------------------------
// Users new /users/model/signup/



// -------------------------------------------------------------------------------------------
// Routes connected to sign up page

/* GET Talent Signup page. */
      
router.get('/talent/signup', function(req, res, next) {
  res.render('talent/talentsignup', { title: 'Lucky Break' });
});



// -------------------------------------------------------------------------------------------
// Sends data from sign up page to database

//router.post('/', (req, res) => {
//  // 2
//  const user = new User(req.body);
//    console.log("2")
//  // 3
//  user.save(function(err, user) {
//    if (err) {
//      console.log(err);
//    }
//
//    // 4
//    return res.redirect('/profile/' + user.id);
//  });
//});


// ------------------------------------------------------------------------------------------
// Sends data from sign up page to database
router.post('/talent', (req, res,next) => {
    console.log(req.body)
    const talent = new Modelinfo(req.body);

     talent.save(function(err, talent) {
    if (err) {
      console.log(err);
        }
        });
    res.redirect(`/talent/${talent._id}`);
    });   
    


// -------------------------------------------------------------------------------------------
// Get user data from the database to be posted on profiles.

router.get('/talent/:id', (req, res) => {
    console.log(req.params.id)
  // 2
  Modelinfo.findById(req.params.id, (err, user) => {
    if (err) {
      console.log(err);
    }

    // 3
      console.log(user)
    res.render('talent/talentprofile', {user});

  });
});

// -------------------------------------------------------------------------------------------
// Get user data from the database to be posted on Comp Card.

router.get('/talent/:id', (req, res) => {
    console.log(req.params.id)
  // 2
  Modelinfo.findById(req.params.id, (err, user) => {
    if (err) {
      console.log(err);
    }

    // 3
      console.log(user)
    res.render('/compcard', {user});

  });
});

//router.get('/talent/:id', (req, res) => {
//  // 2
//  Review.findById(req.params.id, (err, review) => {
//    if (err) {
//      console.log(err);
//    }
//
//    // 3
//    res.render('reviews/show', {
//      review: review
//    });
//  });
//});


// -------------------------------------------------------------------------------------------
// Talent log in
router.post('/login', (req, res, next) => {
    console.log(req.body.password);
  Modelinfo.authenticate(req.body.email, req.body.password, (err, userz) => {
      
          const talent = new Modelinfo(req.body);
    if (err || !userz) {
      const next_error = new Error("Email or password incorrect");
      next_error.status = 401;

      return next(next_error);
    } else {
      req.session.userzId = userz._id;

      return res.redirect(`/talent/${talent._id}`) ;
    }
  });
});

// -------------------------------------------------------------------------------------------
// editting and updating the organization profile.
//Talent Profile edit
router.get('/talent/:id/edit', talentauth.requireLogin, (req, res, next) => {
  Modelinfo.findById(req.params.id, function(err, user){
     if(err) {console.error(err) };
      res.render('talent/talentedit', { user: user});
  });
});




//// Talent Profile update
// UPDATE
router.put('/talent/:id', (req, res) => {
  Modelinfo.findByIdAndUpdate(req.params.id, req.body).then((user) => {
    res.redirect('/talent/' + user._id)
  }).catch((err) => {
    console.log(err.message)
  })
})


module.exports = router;
