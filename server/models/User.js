const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const moment = require("moment");

const userSchema = mongoose.Schema({
    name: {
        type:String,
        maxlength:50
    },
    email: {
        type:String,
        trim:true,
        unique: 1 
    },
    password: {
        type: String,
        minglength: 5
    },
    lastname: {
        type:String,
        maxlength: 50
    },
    role : {
        type:Number,
        default: 0 
    },
    image: String,
    token : {
        type: String,
    },
    tokenExp :{
        type: Number
    }
})

//.pre  mean before saving make something, we will hash the password 
userSchema.pre('save', function( next ) {
    var user = this;
    
    if(user.isModified('password')){    
        // console.log('password changed')
        //To hash paswwors : Technique 1 (generate a salt and hash on separate function calls):
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err);
    
            bcrypt.hash(user.password, salt, function(err, hash){
        
                if(err) return next(err);
                //storing password in db 
                //regenate the password with the salt 
                user.password = hash 
                next()
            })
        })
    } else {
        next()
    }
});

//compare stored hashes with the current password 
//it is used in login 
userSchema.methods.comparePassword = function(plainPassword,cb){
    //code snippet from bcrypt documenation
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if (err) return cb(err);
        //cb : a callback to be fired once the salt has been generated.
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb) {
    var user = this;
    console.log('user',user)
    console.log('userSchema', userSchema)
    
    var token =  jwt.sign(user._id.toHexString(),'secret')

    var oneHour = moment().add(1, 'hour').valueOf();

    user.tokenExp = oneHour;
    //this is a persistent token 
    user.token = token;
    user.save(function (err, user){
        if(err) return cb(err)

        //this is the callback of generatedToken method (err,user) <==> (null,user) 
        cb(null, user);
    })
}

//This funtion is important to use in auth middleware, callback will be sent in th method call in auth middleware 
userSchema.statics.findByToken = function (token, cb) {
    var user = this;

    jwt.verify(token,'secret',function(err, decode){
        //find a user with this token
        //decode contain the user._id because we pass it in jwt.sign in generat token function above 
        user.findOne({"_id":decode, "token":token}, function(err, user){
            if(err) return cb(err);
            cb(null, user);
        })
    })
}

const User = mongoose.model('User', userSchema);

module.exports = { User }