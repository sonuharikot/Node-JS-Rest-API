var express = require('express');
var app = express();
var multer = require('multer')
var constant = require('./config/constants');
var port = process.env.PORT || 8042;
var bodyParser = require('body-parser');
var dateFormat = require('dateformat');
var now = new Date();
global.Config = require('config');  // we use node-config to handle environments
global.Models = require('./app/models');
global.Auth = require('./config/auth.js');
global._ = require('underscore');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
var env = app.get('env') == 'development' ? 'dev' : app.get('env');
// routes =======================
require('./config/routes.js')(app);


//launch ========================
app.listen(port);
console.log('The magic happens on port ' + port);

//catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404).send('Sorry, page not found');
});

app.use(function (req, res, next) {
    res.status(500).send('Sorry, page not found');
});
exports = module.exports = app;