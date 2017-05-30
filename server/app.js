var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var items = require('../models/items.model.js');
require('../modules/db.js');
var port = process.env.PORT || 3004;


// middleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.resolve('./server/public')));

app.get('/', function(req, res) {
  res.sendFile(path.resolve('./server/public/views/index.html'));
});

app.post('/Items', function ( req, res ){
    console.log(req.body);
    var addItem = items(req.body);
    addItem.save().then(function() {
      res.sendStatus(200);
    }); //end save
  }); // end post

app.get('/*', function(req, res) {
  res.sendFile(path.resolve('./server/public/views/index.html'));
});

app.listen( port , function() {
  console.log('server up port 3004');
});
