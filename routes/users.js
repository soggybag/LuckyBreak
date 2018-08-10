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
const Modelpics = require('../models/modelpics');

require('dotenv').config()

// --------------------------------------------------------------
// Define Router /users

const router = express.Router();
const talentauth = require('./helpers/talentauth');
const cloudinary = require('cloudinary');
const methodOverride = require('method-override');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

//const parser = multer({ storage: storage });
const upload = multer({ dest: '/uploads' });

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

// ------------------------------------------------------------------------------------------
// Sends data from sign up page to database
router.post('/talent', (req, res,next) => {
    console.log(req.body)
    const talent = new Modelinfo(req.body);

        cloudinary.uploader.upload(req.file.path, function(result) {
        talent.preferences.full = result.url;
        talent.save(function(err, talent) {
            if (err) {
              console.log(err);
            }
        });
    });

//     talent.save(function(err, talent) {
//    if (err) {
//      console.log(err);
//        }
//        });
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

// -------------------------------------------------------------------------------------------
// Talent log in
router.post('/logintalent', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  // Find this user name
  Modelinfo.findOne({ email }, 'email password').then((user) => {
    if (!user) {
      // User not found
      return res.status(401).send({ message: 'Wrong Email or Password' });
    }
      res.redirect(`/talent/${user.id}`);
    });
  })




// -------------------------------------------------------------------------------------------
// editting and updating the organization profile.
//Talent Profile edit
router.get('/talent/:id/photos/edit', function (req, res, next) {
  Modelinfo.findById(req.params.id, function(err, user) {
    res.render('talent/talentprofilepicsedit', {user: user});
  })
});

// -
// -------------------------------------------------------------------------------------------
// add some user pictures

// define storage

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'talentimages',
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(undefined, 'my-file-name');
  }
});


// setup parser

let cpuUpload = upload.fields([{ name: "full", maxCount: 1 }, {name: "waistup", maxCount: 1}]);

router.post('/talent/photos/:id', cpuUpload, async (req, res) => {
  let user = new Modelpics({
    username: req.body.username,
    profilePhoto: req.files.profilePhoto[0]
  });
});


module.exports = router;
