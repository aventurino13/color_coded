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


//POST new user item
router.post('/userItems', function(req, res) {
  console.log(req.body);
  if (req.user.username == req.body.user){
  var addItem = items(req.body);
  addItem.save().then(function() {
    res.sendStatus(200);
  }); //end save
} else {
    res.sendStatus(403);
  }
}); // end post


//Delete item
router.delete('/remove', function(req, res) {
  console.log(req.query.id);
  items.remove({
    _id: req.query.id
  }).then(function(data) {
    console.log(data);
    res.sendStatus(200);
  });
}); //end remove Items GET route

//upvote item
router.put('/upvote', function(req, res) {
  console.log(req.query.id);
  console.log(req.query.user);
  items.update(
    {_id: req.query.id} ,
    { $addToSet: {votes: req.query.user}
  }).then(function(data) {
    console.log(data);
    res.sendStatus(200);
  });
}); //end remove Items GET route

//GET items of certain type
router.get('/Items', function(req, res) {
  console.log('in req for type on server');
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


//GET all items for user - via home page and search
router.get('/userItems', function(req, res) {
  console.log('req.query.user', req.query.user);
  if (req.query.user !== undefined) {
    items.find({
      user: req.query.user,
    }).then(function(data) {
      console.log(data);
      res.send(data);
    });
  } else {
    res.send("user is undefined");
  }
}); // end GET Items route



//GET items by search tags
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
