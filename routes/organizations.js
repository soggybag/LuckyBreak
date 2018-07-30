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

const Org = require('../models/organization');

// --------------------------------------------------------------
// Define Router /users

const router = express.Router();

// -------------------------------------------------------------------------------------------
// Routes connected to sign up page  

      
/* GET Agency Signup page. */
router.get('/agency/signup', function(req, res, next) {
  res.render('agency/agencysignup', { title: 'Lucky Break' });
});



// -------------------------------------------------------------------------------------------
// Sends data from sign up page to database
router.post('/agency', (req, res, next) => {
    const org = new Org(req.body);
    org.save().then((org) => {
        res.redirect('/agency/profile' + org._id);
    }).catch((err) => {
        console.log(err.message);
    });
});


// -------------------------------------------------------------------------------------------
// Get user data from the database to be posted on profiles.
router.get('/agency/:id', (req, res, next) => {
    
  // 2
  Org.findById(req.param._id, (err, org) => {
    if (err) {
      console.log(err);
    }

    // 3
      console.log(org)
    res.render('agency/agencyprofile', {
      org: org
    });
  });
});


// Agency Profile edit
//router.get('/:id/edit', auth.requireLogin, (req, res, next) => {
  // TODO
//});

// Agency Profile update
//router.post('/:id', auth.requireLogin, (req, res, next) => {
  // TODO
//});


module.exports = router;