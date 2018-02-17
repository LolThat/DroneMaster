/**
 * Created by asafamir Vardi LTD. on 02/06/2017.
 */
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var config = require('../config/config');
var checkToken = expressJwt({secret : config.secrets.jwt});
var User = require('../api/user/userModel');


exports.decodeToken = function () {
    return function (req, res, next) {
        // make it optional to place token on query string
        //if it is , place it on the headers where it should be
        //so checkToken can see it.see follow the 'Bearer ' format
        // so checkToken can see it and decode it
        if(req.query && req.query.hasOwnProperty('access_token')){
            req.headers.authorization = 'Bearer ' + req.query.access_token;
        }
        //this will next if token is valid
        //send error if its not.it will attached
        //the decode token to req user
        checkToken(req, res, next);
    }
};

exports.getCurrentEditorUser = function () {

    return function (req, res, next) {
        User.findById(req.body.editor)
            .then(function (user) {
                if(!user){
                    //if no user is found.it was
                    //a valid jwt but didnt decode
                    //to a real user in our db.ether the user was deleted
                    //since the client got the jwt from some other source
                    res.status(401).send('You dont have admin permission');
                }
                else {
                    //update req.user with fresh user from the
                    //stale token data
                        req.currentEditor = user;
                        //req.permission = "admin";//for update question
                        next();
                }
            },function (err) {
                next(err);
            });
    }
};


exports.getFreshUser = function () {
        return function (req, res, next) {
            User.findById(req.user._id)
                .then(function (user) {
                    if(!user){
                        //if no user is found.it was
                        //a valid jwt but didnt decode
                        //to a real user in our db.ether the user was deleted
                        //since the client got the jwt from some other source
                        res.status(401).send('Unauthorized***');
                    }
                    else {
                        //update req.user with fresh user from the
                        //stale token data
                        req.user = user;
                        next();
                    }
                },function (err) {
                    next(err);
                });
        }
};



exports.verifyUser = function () {
    return function (req, res, next) {
        var username = req.body.username;
        var password = req.body.password;
        //if no username pr password then stop
        if(!username || !password){
            res.status(400).send('you need a username and password');
            return;
        }
        //look user up in the db so we cab check
        //if the passwords match for the username
        console.log("a");

        User.findOne({username:username})
            .then(function (user) {
                if(!user){
                    res.status(401).send('No user with the given username');
                }
                else {
                    //checking the password here
                    console.log("b");

                    if(!user.authenticate(password)){
                        console.log("c");
                        res.status(401).send('Wrong password');
                        console.log("d");

                    }
                    else {
                        //if everything is good
                        //then atatch to req.user
                        //and call next so the controller
                        // can sign a token from the req.user._id
                        console.log("e");
                        req.user = user;
                        next();
                    }
                }
            },function (err) {
                    next(err);
            });
        // use the authenticate() method on a user doc.Passin
        //in the posted password, it will hash the
        //password the same way as the current passwords got hashed
    };
};

//util method to sign tokens on sign up
exports.signToken = function (id) {
    return jwt.sign(
        {_id:id},
        config.secrets.jwt,
        {expiresIn:config.expireTime}
    );
};

