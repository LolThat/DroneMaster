/**
 * Created by asafamir Vardi LTD. on 30/05/2017.
 */
var Category = require('./categoryModel');
var _ = require('lodash');

exports.params = function (req, res, next, id) {
  //use the id and attach the category to req
    Category.findById(id)
        .then(function (category) {
           if(!category){
               next(new Error('No category with that id'));
           }
           else {
               req.category = category;
               next();
           }
        }, function (err) {
            next(err);
        });
};

exports.get = function (req, res, next) {
    Category.find({})
        .then(function (categories) {
            res.json(categories);

        }, function (err) {
            next(err)
        });

};
exports.getOne = function (req, res, next) {
    var category = req.category;
    res.json(category);
};

exports.put = function (req, res, next) {
    var category = req.category;
    var update = req.body;
    _.merge(category, update);
    catgory.save(function(err, saved){
       if(err){
            next(err);
       }
       else{
           res.json(saved);
       }
    });
};

exports.post = function (req, res, next) {
    var newCategory = req.body;
    Category.create(newCategory)
        .then(function (category) {
            res.json(category)
        },function (err) {
            next(err);
        });
};

exports.delete = function (req, res, next) {
    req.category.remove(function (err, removed) {
        if(err){
            next(err);
        }
        else{
            res.json(removed);
        }
    });
};

