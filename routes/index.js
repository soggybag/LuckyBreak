var express = require('express');
var router = express.Router();

// 1
const Modelinfo = require('../models/modelinfo');
const Orginfo = require('../models/organizationinfo');
const auth = require('./helpers/orgauth')
const talentauth = require('./helpers/talentauth')

/* GET Logged (agency) in */
router.use(function(req, res, next) {
  res.locals.title = "Lucky Break";
  res.locals.currentUserId = req.session.userId;

  next();
});

/* Logged out */
router.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) return next(err);
    });
  }

  return res.redirect('/');
});


//-----------------
/* GET Logged (talent) in */
router.use(function(req, res, next) {
  res.locals.title = "Lucky Break";
  res.locals.currentUserzId = req.session.userzId;

  next();
});


module.exports = router;
/* GET home page/Log in */

router.get('/', function(req, res, next) {
  res.render('both/mainpage', { title: 'Lucky Break', layout: false });
});

/* GET Agency Browsing page. */
router.get('/organization/', function(req, res, next) {
  res.render('organization/organizationbrowsing', { title: 'Lucky Break' });
});

/* GET Agency Profile page. */
router.get('/organization/profile', function(req, res, next) {
  res.render('organization/organizationprofile', { title: 'Lucky Break' });
});

/* GET Talent Browsing page. */
router.get('/talent/', function(req, res, next) {
  res.render('talent/talentbrowsing', { title: 'Lucky Break' });
});

/* GET Talent Profile page. */
router.get('/profile', function(req, res, next) {
  res.render('talent/talentprofile', { title: 'Lucky Break' });
});

/* GET Talent Comp Card page. */
router.get('/compcard', function(req, res, next) {
  res.render('talent/compcard', { title: 'Lucky Break' });
});

/* GET Talent Profile Pictures Edit page. */
router.get('/talent/photos/edit', (req, res) => {
    console.log('-------------------------------------');
    console.log('get:/talent/photos/edit');
  res.render('talent/talentprofilepicsedit', { title: 'Lucky Break' });
});

/* GET Contact Us page. */
router.get('/contact', function(req, res, next) {
  res.render('both/contact', { title: 'Lucky Break' });
});

/* GET Your Connections page. */
router.get('/connections', function(req, res, next) {
  res.render('both/yourconnections', { title: 'Lucky Break' });
});

/* GET Congratulations for signing up page. */
router.get('/congratulations', function(req, res, next) {
  res.render('both/congrats', { title: 'Lucky Break' });
});

/* GET Inbox Page */
router.get('/inbox', function(req, res, next) {
  res.render('both/inbox', { title: 'Lucky Break' });
});

/* GET Signout Page */
router.get('/signout', function(req, res, next) {
  res.render('both/signout', { title: 'Lucky Break', layout: false });
});

module.exports = router;
