/**
 * Created by asafamir Vardi LTD. on 30/05/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var bcrypt = require('bcrypt');
var MetaDataAppSchema = new Schema({

    key:String,
    value:String,
    description : String,
    type:String
});


module.exports = mongoose.model('metadataapp',MetaDataAppSchema);