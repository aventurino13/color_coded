//Requires
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
   key: 'user',           //name of the req.variable
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




//listen on port
app.listen(port, function() {
  console.log('server up port 3004');
});
