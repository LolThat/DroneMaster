/**
 * Created by asafamir Vardi LTD. on 07/06/2017.
 */
var Note = require('./noteModel');
var _ = require('lodash');

exports.params = function (req, res, next, id) {
    //use the id and attach the note to req
    Note.findById(id)
        .then(function (note) {
            if(!note){
                next(new Error('No note with that id'));
            }
            else {
                req.note = note;
                next();
            }
        }, function (err) {
            next(err);
        });
};

exports.get = function (req, res, next) {
    Note.find({})
        .then(function (notes) {
            res.json(notes);

        }, function (err) {
            next(err)
        });

};
exports.getOne = function (req, res, next) {
    var note = req.note;
    res.json(note);
};

exports.put = function (req, res, next) {
    var note = req.note;
    var update = req.body;
    _.merge(note, update);
    note.save(function(err, saved){
        if(err){
            next(err);
        }
        else{
            res.json(saved);
        }
    });
};

exports.post = function (req, res, next) {
    var newNote = req.body;
    Note.create(newNote)
        .then(function (note) {
            res.json(note)
        },function (err) {
            next(err);
        });
};

exports.delete = function (req, res, next) {
    req.note.remove(function (err, removed) {
        if(err){
            next(err);
        }
        else{
            res.json(removed);
        }
    });
};