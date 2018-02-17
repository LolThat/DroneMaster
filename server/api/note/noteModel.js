/**
 * Created by asafamir Vardi LTD. on 07/06/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NoteSchema = new Schema({

    title : {
        type:String,
        unique:false,
        required :true
    },
    value : {
        type:String,
        unique:false,
        required :true
    },
    color : {
        type:String,
        unique:false,
        required :true
    }


});

module.exports = mongoose.model('note',NoteSchema);