/**
 * Created by asafamir. on 28/06/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var LikeSchema = new Schema({

    value: Number,
    owner_id: {
        type: Schema.Types.ObjectId,
      //  ref: 'player',
    },
    question_id: {
        type: Schema.Types.ObjectId,
        //ref: 'player',
    },
    created:Date,
    modified:Date

});


module.exports = mongoose.model('like',LikeSchema);