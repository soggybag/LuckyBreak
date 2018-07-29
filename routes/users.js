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

const User = require('../models/user');

// --------------------------------------------------------------
// Define Router /users

const router = express.Router();


// --------------------------------------------------------------
// Define routes 

// --------------------------------------------------------------
// Users new /users/model/signup/



// -------------------------------------------------------------------------------------------
// Routes connected to sign up page

/* GET Talent Signup page. */
      
router.get('/signup', function(req, res, next) {
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
router.post('/', (req, res) => {
    const user = new User(req.body);
    user.save().then((user) => {
        res.redirect('/profile' + user._id);
    }).catch((err) => {
        console.log(err.message);
    });
});

// -------------------------------------------------------------------------------------------
// Get user data from the database to be posted on profiles.

router.get('/model/:id', (req, res) => {
    
  // 2
  User.findById(req.params.id, (err, user) => {
    if (err) {
      console.log(err);
    }

    // 3
    res.render('talent/talentprofile', {
      user: User
    });
  });
});


module.exports = router;


