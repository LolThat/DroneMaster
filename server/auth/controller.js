/**
 * Created by asafamir Vardi LTD. on 02/06/2017.
 */
var User = require('../api/user/userModel');
var signToken = require('./auth').signToken;

exports.signin = function (req, res, next) {
    //req.user will be there from the middleware
    //verify user.then we can just create a token
    //and send it back for the client to consume
    console.log("aaa");
    var token = signToken(req.user._id);
    res.json({user:req.user, token:token});
};