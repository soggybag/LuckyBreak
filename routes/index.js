var express = require('express');
var router = express.Router();

// 1
const User = require('../models/user');
const Org = require('../models/organization');

/* GET home page/Log in */
router.get('/', function(req, res, next) {
  res.render('both/mainpage', { title: 'Lucky Break', layout: false });
});

router.post('/', (req, res, next) => {
  console.log('logging in!');
  console.log(req.body);

  res.redirect('/');
});

/* GET Agency Browsing page. */
router.get('/agency/', function(req, res, next) {
  res.render('agency/agencybrowsing', { title: 'Lucky Break' });
});

/* GET Agency Profile page. */
router.get('/agency/profile', function(req, res, next) {
  res.render('agency/agencyprofile', { title: 'Lucky Break' });
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
