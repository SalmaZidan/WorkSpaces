const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    user_name:{
        type: String
    },
    user_email:{
        type: String,
        unique: true,
        trim: true
    },
    user_type:{
        type:String,
        enum: [ "admin", "client", "workspace admin", "workspace employee"],
        required : true,
    },
    user_password:{
        type: String,
        minLength : 6,
        maxLength : 100,
        required : true,
        trim: true
    },
    user_image:{
        type:String
    },
    user_phoneNumber:{
        type:Number,
        minLength : 10,
        maxLength : 15,
    },
    user_address:{
        country:{type:String},
        city:{type:String},
        neighbarhood:{type:String}
    },
    user_comments:[
        {
            service_id:{type:String}, //mongoose.Schema.Types.ObjectId
            comment:{type:String}
        }
    ],
    tokens:[
        {
            token:{type: String}
        }
    ]
})

UserSchema.methods.toJSON=function(){
    const user = this
    const userOBJ = user.toObject()
    delete userOBJ.user_password
    return userOBJ
}

UserSchema.statics.findByCredentials = async function(user_email, user_password){
   const user = await User.findOne({ "user_email" : user_email, "user_password" : user_password })
   if(!user) throw new Error('unauthorized')
   return user 
}

UserSchema.methods.genrateToken = async function(){
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, 'tsrnmb')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token

}

const User = mongoose.model('user', UserSchema)
module.exports = User