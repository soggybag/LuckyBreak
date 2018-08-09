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

require('dotenv').config()


// --------------------------------------------------------------
// Define Router /users

const router = express.Router();
const auth = require('./helpers/orgauth')
var cloudinary = require('cloudinary');
// -------------------------------------------------------------------------------------------
// Routes connected to sign up page
//const multer  = require('multer')
//const upload = multer()

cloudinary.config({ 
  cloud_name: 'lucky-break', 
  api_key: '924158175189213', 
  api_secret: 'ktI0M-FDFBZiZbkeqbOVSdhTLVg' 
});
/* GET Agency Signup page. */
router.get('/organization/signup', function(req, res, next) {

  res.render('organization/organizationsignup', { title: 'Lucky Break' });
});



// -------------------------------------------------------------------------------------------
// Sends data from sign up page to database
//router.post('/organization', function (req, res,next) {
//    console.log(req.body)
//    for(let prop in req.body){
//        console.log(prop);
//    }
//    const org = new Orginfo(req.body);
////    console.log(req.file)
//    cloudinary.uploader.upload(req.file.path, function(result) { 
//    org.preferences.logo = result.url;
//     org.save(function(err, org) {
//    if (err) {
//      console.log(err);
//        }
//        });
//    });
//   
//
//    res.redirect(`/organization/${org._id}`);
//});
//       



// -------------------------------------------------------------------------------------------
// Get user data from the database to be posted on profiles.
router.get('/organization/:id', (req, res, next) => {
  // 2
  Orginfo.findById(req.params.id, (err, org) => {
    if (err) {
      console.log(err);
    }

    // 3
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
// UPDATE
router.put('/organization/:id', (req, res) => {
  Orginfo.findByIdAndUpdate(req.params.id, req.body).then((org) => {
    res.redirect('/organization/' + org._id)
  }).catch((err) => {
    console.log(err.message)
  })
})

// -------------------------------------------------------------------------------------------
//Agency Photo upload

//router.post('/api/photo',function(req,res, next){
// var org = new Orginfo();
// org.img.data = fs.readFileSync(req.files.userPhoto.path)
// org.img.contentType = 'image/png';
// org.update();
//});

module.exports = router;
