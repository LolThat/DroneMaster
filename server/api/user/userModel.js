/**
 * Created by asafamir Vardi LTD. on 30/05/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
var UserSchema = new Schema({

    username : {
        type:String,
        unique:true,
        required :true
    },
    
    //dont store the password as plaintext 
    password:{
        type:String,
        required:true 
    },
    isActive:Boolean,
    firstname:String,
    lastname:String,
    phone:String,
    created:Date,
    modified:Date,
    permission:{
        type:{}
    }
});


UserSchema.pre('save', function (next) {
    if(!this.isModified('password')) return next();
    this.password = this.encryptPassword(this.password);
    next();
});

UserSchema.methods = {

    authenticate : function (plainTextPword) {
        return bcrypt.compareSync(plainTextPword, this.password);
    },
    // hash the password
    encryptPassword:function (plainTextPword) {
        if(!plainTextPword){
            return '';
        }
        else {
            var salt = bcrypt.genSaltSync(10);
            return bcrypt.hashSync(plainTextPword, salt);
        }
    },
    toJson:function () {
        var obj = this.toObject();
        delete obj.password;
        return obj;
    }
};



module.exports = mongoose.model('user',UserSchema);