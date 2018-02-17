/**
 * Created by asafamir Vardi LTD. on 30/05/2017.
 */
var CurrentItem = require('./MetaDataAppModel');
var _ = require('lodash');
var auth = require('./../../auth/auth');

exports.getAllItems = function (req, res, next) {
    CurrentItem.find({})
        .then(function (metadata)
        {
            if(req.currentEditor.permission.name == "admin")
            {
                res.json(metadata);
            }
            else
            {
                res.json({permission:"you are not admin"});
            }

        }, function (err) {
            next(err)
        });
};



exports.updateItem = function (req, res, next) {
    if(req.currentEditor.permission.name == "admin")
    {
        var item = new CurrentItem(req.body.item1);
        CurrentItem.findOne({_id: item._id}, function(err, metadata)
        {
            metadata.key = item.key;
            metadata.value = item.value;
            metadata.description = item.description;
            metadata.type = item.type;
            metadata.modified = item.modified;
            metadata.save(function(err, saved){
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
        res.json({metadata: "failed to update configapp"});
    }
};



exports.deleteItem = function (req, res, next) {
   var item = new CurrentItem(req.body.item);
   console.log("***"+item);
    if(req.currentEditor.permission.name == "admin")
    {
        console.log("***2" + item);
        item.remove(function (err, removed) {
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
        res.json({user: "failed to delete metadata"});
    }
};
exports.addNewItem = function (req, res, next)
{

    var newItem = new CurrentItem(req.body.item1);
   // delete newItem._id;
    console.log("***" + newItem);

    if(req.currentEditor.permission.name == "admin")
        {
            newItem.save(function (err, c) {
                if (err) {
                    return next(err);
                }
                res.json({c: c});
            });
        }
        else
        {
            res.json({user: "failed to add user"});
        }

};





