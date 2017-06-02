var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var items = require('./models/items.model.js');
require('./modules/db.js');
var port = process.env.PORT || 3004;

var passport = require('./strategies/user.strategy');
var session = require('express-session');

// Route includes
var index = require('./routes/index');
var user = require('./routes/user');
var register = require('./routes/register');

// middleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.resolve('./server/public')));


app.use(session({
   secret: 'secret',
   key: 'user', // this is the name of the req.variable. 'user' is convention, but not required
   resave: 'true',
   saveUninitialized: false,
   cookie: { maxage: 60000, secure: false }
}));

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/register', register);
app.use('/user', user);

app.use('/*', index);


      // app.get('/', function(req, res) {
      //   res.sendFile(path.resolve('./server/public/views/index.html'));
      // });

// app.post('/Items', function(req, res) {
//   console.log(req.body);
//   var addItem = items(req.body);
//   addItem.save().then(function() {
//     res.sendStatus(200);
//   }); //end save
// }); // end post
//
// app.get('/remove', function(req, res) {
//   console.log(req.query.id);
//   items.remove({
//     _id: req.query.id
//   }).then(function(data) {
//     console.log(data);
//     res.sendStatus(200);
//   });
// }); //end remove Items GET route
//
// app.get('/Items', function(req, res) {
//   console.log(req.query.type);
//   if (req.query.type !== undefined) {
//     items.find({
//       type: req.query.type
//     }).then(function(data) {
//       console.log(data);
//       res.send(data);
//     });
//   } else {
//     items.find().then(function(data) {
//       console.log(data);
//       res.send(data);
//     });
//   }
// }); // end GET Items route
//
// app.get('/user', function(req, res) {
//   console.log(req.query.user);
//   if (req.query.user !== undefined) {
//     items.find({
//       user: req.query.user,
//     }).then(function(data) {
//       console.log(data);
//       res.send(data);
//     });
//   }
// }); // end GET Items route


app.get('/*', function(req, res) {
  res.sendFile(path.resolve('./server/public/views/index.html'));
});

app.listen(port, function() {
  console.log('server up port 3004');
});
