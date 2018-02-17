/**
 * Created by asafamir. on 28/06/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var bcrypt = require('bcrypt');
var EventSchema = new Schema({

    title: String,
    description: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'player',
    },
    created:Date,
    modified:Date

});


module.exports = mongoose.model('eventapp',EventSchema);