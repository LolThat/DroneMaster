/**
 * Created by asafamir Vardi LTD. on 29/05/2017.
 */
var express = require('express');
var app = express();
var api = require('./api/api');
var err = require('./middleware/err');
var config = require('./config/config');
var auth = require('./auth/routes');
var dev = require('./config/development');


//require('mongoose').connect(config.getDbConnectionString());

// if(dev.seed) {
//     //require('./util/seed');
// }

//setup the app middleware
require('./middleware/appMiddleware')(app);
//setup the api
app.use('/api',api);
app.use('/auth',auth);
app.use('/assets', express.static(__dirname + '/../public'));

app.use(function (err, req, res, next) {
    //if error thrown from jwt validation check
    if(err.name === 'UnauthorizedError'){
        res.status(401).send('Invalid token');
        return;
    }
    console.log(err.stack);
    res.status(500).send('oops');
});

//setup global error handling
//app.use(err());
//export the app for testing
module.exports = app;