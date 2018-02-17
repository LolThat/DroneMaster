/**
 * Created by asafamir Vardi LTD. on 30/05/2017.
 */
var Application = require('./applicationModel');
var _ = require('lodash');

exports.params = function (req, res, next, id) {
    //use the id and attach the category to req
    Application.findById(id).populate('author','username')
        .exec()
        .then(function (application) {
            if(!application){
                next(new Error('No application with that id'));
            }
            else {
                req.application = application;
                next();
            }//a
        }, function (err) {
            next(err);
        });
};

exports.get = function (req, res, next) {
    Application.find({}).populate('author categories')
        .exec()
        .then(function (applications) {
            res.json(applications);

        }, function (err) {
            next(err)
        });
};


exports.getOne = function (req, res, next) {
    var application = req.application;
    res.json(application);
};

exports.put = function (req, res, next) {
    var application = req.application;
    var update = req.body;
    _.merge(application, update);
    application.save(function(err, saved){
        if(err){
            next(err);
        }
        else{
            res.json(saved);
        }
    });
};

exports.post = function (req, res, next) {
    var newApplication = req.body;
    Application.create(newApplication)
        .then(function (application) {
            res.json(application)
        },function (err) {
            next(err);
        });
};

exports.delete = function (req, res, next) {
    req.application.remove(function (err, removed) {
        if(err){
            next(err);
        }
        else{
            res.json(removed);
        }
    });
};

