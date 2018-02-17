/**
 * Created by asafamir Vardi LTD. on 29/05/2017.
 */
//intro point for out server
//ypu can just require that folder and node will
//automatically require the index.js on the root

//setup config first before anything by requiring it
var config = require('./server/config/config');
var app = require('./server/server');
var mongoose = require("mongoose");


//var logger = require('./server/util/logger');
//mongoose.Promise = global.Promise;
//a
mongoose.connect(config.getDbConnectionString());
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://10.7.0.3:27107/data/db');

//Connected To Database
// mongoose.connection.on('connected ', () => {
//     console.log("Connected to database " + config.getDbConnectionString());
//     //console.log(config.secret);
// });
//Connected With Error Database
// mongoose.connection.on('error', (err) => {
//     console.log("Database error " + err);
// });


app.listen(config.port,function () {
    console.log("listening to " + config.port + " now");
});
