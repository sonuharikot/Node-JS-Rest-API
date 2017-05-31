var express = require('express');
var app = express();
var formidable = require('express-formidable');
app.use(formidable({
encoding: 'utf-8',
        uploadDir: './tmp',
        multiples: true,
        keepExtensions:true
        }));
var multer = require('multer')
var constant = require('./config/constants');
var port = process.env.PORT || 8042;
var bodyParser = require('body-parser');
var dateFormat = require('dateformat');
var now = new Date();
global.Config = require('config');  // we use node-config to handle environments
global.Models = require('./app/models');
global.Auth = require('./config/auth.js');
global.Func = require('./config/functions.js');
global._ = require('underscore');
global.Fs = require('fs.extra');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
var env = app.get('env') == 'development' ? 'dev' : app.get('env');
// routes =======================
require('./config/routes.js')(app);


//launch ========================
app.listen(port);
console.log('The magic happens on port ' + port);


exports = module.exports = app;