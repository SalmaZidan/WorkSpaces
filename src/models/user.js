const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const workingSpace = require('./workingspace');

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
        default: "client",
        required : true
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
        country:{type:String,required: true},
        city:{type:String,required: true},
        detailedAddress:{type:String,required: true} 
    },
    tokens:[
        {
            token:{type: String}
        }
    ],
    workspace:{
        type: mongoose.Schema.Types.ObjectId, 
        ref:'workingSpace',
        default : mongoose.Types.ObjectId('4edd40c86762e0fb12000003'), // defult to client
        required: true
    },
    user_profile_img:{ type:String }
})

UserSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('user_password')) user.user_password = await bcrypt.hash(user.user_password, 8)
    next()
})

UserSchema.methods.toJSON=function(){
    const user = this
    const userOBJ = user.toObject()
    delete userOBJ.user_password
    return userOBJ
}

UserSchema.statics.findByCredentials = async function(user_email, user_password){
   const user = await User.findOne({user_email})
   if(!user) throw new Error('unauthorized')
   const isMatch = await bcrypt.compare(user_password, user.user_password)
   if(!isMatch) throw new Error('unable login')
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