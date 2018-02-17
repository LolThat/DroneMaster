/**
 * Created by asafamir Vardi LTD. on 30/05/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ApplicationSchema = new Schema({

    title : {
        type:String,
        unique:true,
        required :true
    },
    text:{
        type:String,
        required:true
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    //array of ids from categories
    categories:[
            {
                type:Schema.Types.ObjectId,ref:'category'
            }
        ]
});

module.exports = mongoose.model('application',ApplicationSchema);