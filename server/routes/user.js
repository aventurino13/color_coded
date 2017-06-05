var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var items = require('../models/items.model.js');
require('../modules/db.js');

// Handles Ajax request for user information if user is authenticated
router.get('/', function(req, res) {
  console.log('get /user route');
  // check if logged in
  if(req.isAuthenticated()) {
    // send back user object from database
    console.log('logged in');
    res.send(req.user);
  } else {
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
    res.send(false);
  }
});

router.post('/userItems', function(req, res) {
  console.log(req.body);
  var addItem = items(req.body);
  addItem.save().then(function() {
    res.sendStatus(200);
  }); //end save
}); // end post

router.get('/remove', function(req, res) {
  console.log(req.query.id);
  items.remove({
    _id: req.query.id
  }).then(function(data) {
    console.log(data);
    res.sendStatus(200);
  });
}); //end remove Items GET route

router.get('/Items', function(req, res) {
  console.log(req.query.type);
  if (req.query.type !== undefined) {
    items.find({
      type: req.query.type
    }).then(function(data) {
      console.log(data);
      res.send(data);
    });
  } else {
    items.find().then(function(data) {
      console.log(data);
      res.send(data);
    });
  }
}); // end GET Items route

router.get('/userItems', function(req, res) {
  console.log(req.query.user);
  if (req.query.user !== undefined) {
    items.find({
      user: req.query.user,
    }).then(function(data) {
      console.log(data);
      res.send(data);
    });
  }
}); // end GET Items route

router.get('/tags', function(req, res) {
  console.log(req.query.tags);
  var phrase = req.query.tags;
  items.find({
    tags: { $in: [phrase]},
  }).then(function(data) {
    console.log(data);
    res.send(data);
  });
});
// clear all server session information about this user
router.get('/logout', function(req, res) {
  // Use passport's built-in method to log out the user
  console.log('Logged out');
  req.logOut();
  res.sendStatus(200);
});



module.exports = router;
