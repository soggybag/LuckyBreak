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

const Orginfo = require('../models/organizationinfo');

// --------------------------------------------------------------
// Define Router /users

const router = express.Router();
const auth = require('./helpers/orgauth')

// -------------------------------------------------------------------------------------------
// Routes connected to sign up page


/* GET Agency Signup page. */
router.get('/organization/signup', function(req, res, next) {
  res.render('organization/organizationsignup', { title: 'Lucky Break' });
});



// -------------------------------------------------------------------------------------------
// Sends data from sign up page to database
router.post('/organization', (req, res, next) => {

    const org = new Orginfo(req.body);
    console.log(org);
    org.save(function(err, org) {
    if (err) {
      console.log(err);
    }

    // 4
    res.redirect(`/organization/${org._id}`);
  });
});
       



// -------------------------------------------------------------------------------------------
// Get user data from the database to be posted on profiles.
router.get('/organization/:id', (req, res, next) => {
    console.log('hello')
    console.log("the site is" + req.params.id)
  // 2
  Orginfo.findById(req.params.id, (err, org) => {
    if (err) {
      console.log(err);
    }

    // 3
      console.log(org)
    res.render('organization/organizationprofile', {org});
  });
});


// -------------------------------------------------------------------------------------------
// Agency Log in

router.post('/login', (req, res, next) => {
  Orginfo.authenticate(req.body.email, req.body.password, (err, agencyuser) => {
          const org = new Orginfo(req.body);
    if (err || !agencyuser) {
      const next_error = new Error("Email or password incorrect");
      next_error.status = 401;

      return next(next_error);
    } else {
        console.log(agencyuser._id);
      req.session.userId = agencyuser._id;
        
      return res.redirect(`/organization/${org._id}`) ;
    }
  });
});

// -------------------------------------------------------------------------------------------
// editting and updating the organization profile.
//Agency Profile edit
router.get('/:id/edit', auth.requireLogin, (req, res, next) => {
  Orginfo.findById(req.params.id, function(err, org){
     if(err) {console.error(err) };
      res.render('organization/organizationedit', { org: org});
  });
});




//// Agency Profile update
router.post('/:id/edit', auth.requireLogin, (req, res, next) => {
 Orginfo.findByIdAndUpdate(req.params.id, req.body, function(err, org) {
    if(err) { console.error(err) };
     
    res.redirect('/organization/profile' + req.params.id);
  });
});


module.exports = router;
