/**
 * Created by asafamir Vardi LTD. on 30/05/2017.
 */
var User = require('./userModel');
var _ = require('lodash');
var auth = require('./../../auth/auth');

// exports.params = function (req, res, next, id) {
//     //use the id and attach the category to req
//     User.findById(id)
//         .select("-password")
//         .exec()
//         .then(function (user) {
//             if(!user){
//                 next(new Error('No user with that id'));
//             }
//             else {
//                 console.log(user);
//                 req.user = user;
//                 next();
//             }
//         }, function (err) {
//             next(err);
//         });
// };
exports.getAllUsers = function (req, res, next) {
    User.find({})
        .then(function (users)
        {
            console.log("A");
            res.json(users);

            console.log("***" +req.currentEditor.permission.name)
            if(req.currentEditor.permission.name == "admin")
            {
                console.log(users);
                res.json(users);
            }
            else
            {
                res.json({permission:"you are not admin"});
            }

        }, function (err) {
            next(err)
        });
};
exports.getOne = function (req, res, next) {
    var user = req.user;
    res.json(user);
};
exports.put = function (req, res, next) {
    var user = req.user;
    var update = req.body;
    _.merge(user, update);
    user.save(function(err, saved){
        if(err){
            next(err);
        }
        else{
            res.json(saved);
        }
    });
};
exports.updateUser = function (req, res, next) {
    if(req.currentEditor.permission.name == "admin")
    {
        var updateUser = new User(req.body.user);
        User.findOne({_id: updateUser._id}, function(err, user)
        {
            user.firstname = updateUser.firstname;
            user.lastname = updateUser.lastname;
            user.password = updateUser.password;
            user.username = updateUser.username;
            user.phone = updateUser.phone;
            user.created = updateUser.created;
            user.modified = updateUser.modified;
            user.permission = updateUser.permission;
            user.isActive = updateUser.isActive;
            user.save(function(err, saved){
                if(err){
                    next(err);
                }
                else{
                    res.json(saved);
                }
            });
        });

    }
    else
    {
        res.json({user: "failed to delete user"});
    }
};
exports.deleteUser = function (req, res, next) {
   var deleteUser = new User(req.body.user);
    if(req.currentEditor.permission.name == "admin")
    {
        console.log(deleteUser);
        deleteUser.remove(function (err, removed) {
            if(err){
                next(err);
            }
            else{
                res.json(removed);
            }
        });
    }
    else
    {
        res.json({user: "failed to delete user"});
    }
};
exports.addNewUser = function (req, res, next) {

    var newUser = new User(req.body);
    newUser.save(function (err, user) {
        console.log(user._id);
        if(err){return next(err);}
        var token = auth.signToken(user._id);
        res.json({user:user,token:token});
    });
    //var newUser = req.body.user;
    //console.log(req.body);
    //if(req.currentEditor);
    //console.log(req.currentEditor);
    //console.log(req.headers.authorization);
    //res.json({a1:"hello"});
};
exports.me = function (req, res) {
    res.json(req.user.toJson());
};

//-----------old function for future ---------------------------------
exports.delete = function (req, res, next) {
    req.user.remove(function (err, removed) {
        if(err){
            next(err);
        }
        else{
            res.json(removed);
        }
    });
};

exports.register = function (req, res, next) {
    var newUser = new User(req.body);
    newUser.save(function (err, user) {
        if(err){return next(err);}
        var token = auth.signToken(user._id);
        res.json({user:user,token:token});
    });
};
