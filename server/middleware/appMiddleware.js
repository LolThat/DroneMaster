/**
 * Created by asafamir Vardi LTD. on 29/05/2017.
 */

var morgan = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
//var override = require('method-override');
//setup global middle ware


module.exports = function (app) {
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());
    app.use(cors());




    // app.use(override());
};