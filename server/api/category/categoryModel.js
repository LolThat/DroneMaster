/**
 * Created by asafamir Vardi LTD. on 30/05/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({

    name : {
        type:String,
        unique:true,
        required :true
    }
});//

module.exports = mongoose.model('category',CategorySchema);