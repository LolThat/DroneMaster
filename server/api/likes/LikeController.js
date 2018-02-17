/**
 * Created by asafamir Vardi LTD. on 28/06/2017.
 */
var CurrentItem = require('./LikeModel');
var _ = require('lodash');
var auth = require('./../../auth/auth');
var Metadata = require('./../metadata/MetaDataAppModel');

exports.getAllItems = function (req, res, next)
{
    CurrentItem.find({})
        .then(function (data)
        {
            if(req.currentEditor.permission.name == "admin")
            {
                res.json(data);
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

    // var obj = req.body.item;
    // try
    // {
    //     obj = JSON.parse(req.body.item);
    // }
    // catch (e)
    // {
    //     obj = req.body.item;
    // }
    // console.log(obj);
    var token = req.body.token;
    Metadata.findOne({key:"token"})
        .exec()
        .then(function (meta)
        {
            if(meta.value == token)
            {
                var item = req.body.item;

                var keys = Object.keys(item);
                // for (var i=0;i<keys.length;i++ )
                // {
                //     item[keys[i]] = req.body[keys[i]];
                // }
                CurrentItem.findOne({owner_id: item.owner_id,question_id:item.question_id}, function(err, like)
                {

                    if(like) { // update like
                        for (var i = 0; i < keys.length; i++) {
                            if (keys[i] in like) {
                                like[keys[i]] = item[keys[i]];
                            }
                        }
                        like.save(function (err, saved) {
                            if (err) {
                                next(err);
                            }
                            else {
                                console.log(saved);
                                res.json(saved);
                            }
                        });
                    }
                    else{ // create new like
                        var newItem = new CurrentItem(item);
                        newItem.save(function (err, item) {
                            if (err)
                            {
                                console.log(err);
                                return next(err);
                            }
                            console.log(item);
                            res.json({item: item});
                        });
                    }
                });
            }
            else
            {
                res.json({item: "failed to add player"});
            }
        });
};
exports.deleteItem = function (req, res, next) {
    var item = new CurrentItem(req.body.item);
    if(req.currentEditor.permission.name == "admin")
    {
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
        res.json({user: "failed to delete player"});
    }
};





