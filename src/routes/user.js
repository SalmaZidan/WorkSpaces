const express= require('express');
const User = require('../models/user');
const mongodb = require('mongodb');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/authmiddleware');
const multer = require('multer');

const router = new express.Router()

// add new user 
router.post('/User/Registration', async (req, res)=>{
    const user_data = new User(req.body)
    try{
        await user_data.save()
        const token = await user_data.genrateToken()
        res.status(200).send({
            status:1,
            data: user_data,
            msg: 'successful registration',
            Token : token
        })
    }
    catch(e){
        res.status(200).send({
            status:0,
            data: '',
            msg: 'failed registration',
            error : e,
            Token : ''
        })
    }

})

// get user by type
router.get('/Users/:type', async(req,res)=>{
    type = req.params.type
    try{
        const user_data = await User.find({"user_type" : type})
        res.status(200).send({
            status:1,
            data: user_data,
            msg: `all ${type} selected`
        })
    }
    catch(e){
        res.status(200).send({
            status:0,
            data: e,
            msg: `error loading ${type} data`
        })
    }
})

// get single user by id 
router.get('/singleUser',auth, async(req,res)=>{
    //_id = req.params.id
    try{
        const user_data = await User.findById(req.data._id)
        res.status(200).send({
            status:1,
            data: user_data,
            msg: 'user data selected'
        })
    }
    catch(e){
        res.status(200).send({
            status:0,
            data: e,
            msg: 'error loading user data'
        })
    }
})

// get single user by id 
router.get('/singleUserBy/:id',auth, async(req,res)=>{
    _id = req.params.id
    try{
        const user_data = await User.findById(_id)
        res.status(200).send({
            status:1,
            data: user_data,
            msg: 'user data selected'
        })
    }
    catch(e){
        res.status(200).send({
            status:0,
            data: e,
            msg: 'error loading user data'
        })
    }
})


// edit user data
router.patch('/UserUpdate/:id',auth, async(req,res)=>{
    const _id= req.params.id
    const updates = req.body
    const updatesKeys = Object.keys(req.body)
    const allowedUpdates = ["user_name","user_email","user_image","user_phoneNumber","user_address"]
    const validUpdates = updatesKeys.every((u)=>allowedUpdates.includes(u))
    if(!validUpdates)
        res.status(200).send({
            status:4,
            data:'',
            msg:'invalid updates'
        })
    try{
        const user_data = await User.findByIdAndUpdate(_id, updates,{
            new:true,
            runValidators:true
        })
        if(!user_data){
            res.status(200).send({
                status:2,
                data:"",
                msg:"user not found"
            })
        }
        res.status(200).send({
            status:1,
            data: user_data, 
            msg:"user data Update successfuly"
        })
    }
    catch(e){
        res.status(200).send({
            statue: 0,
            data:'',
            msg:"error edit data",
            error: e
        })
    }
})

// change user password
router.patch('/UpdatePassword/:id',auth, async(req,res)=>{
    const _id= req.params.id
    const updates = req.body
    const updatesKeys = Object.keys(req.body)
    const allowedUpdates = ["user_password"]
    const validUpdates = updatesKeys.every((u)=>allowedUpdates.includes(u))
    if(!validUpdates)
        res.status(200).send({
            status:4,
            data:'',
            msg:'invalid updates'
        })
    try{
        const user_data = await User.findByIdAndUpdate(_id, updates,{
            new:true,
            runValidators:true
        })
        if(!user_data){
            res.status(200).send({
                status:2,
                data:"",
                msg:"user not found"
            })
        }
        res.status(200).send({
            status:1,
            data: user_data, 
            msg:"user data Update successfuly"
        })
    }
    catch(e){
        res.status(200).send({
            statue: 0,
            data:'',
            msg:"error edit data",
            error: e
        })
    }
})

// login
router.post('/login', async (req, res)=>{
    try{
        const user_data = await User.findByCredentials(req.body.user_email , req.body.user_password) 
        const token = await user_data.genrateToken()
        res.status(200).send({
            status:1,
            data: user_data,
            msg: 'logged in',
            token: token
        })
    }
    catch(e){
        res.status(200).send({
            status:0,
            data: e,
            msg: "login error",
            token:''
        })
    }

})

// logout
router.patch('/logout',auth, async (req, res)=>{
    try{
        const token = req.header('Authorization').replace("Bearer ", "")
        const decodedToken = jwt.verify(token, 'tsrnmb')
        console.log(decodedToken)
        const user_data = await User.findOne({
            _id : decodedToken._id, 'tokens.token': token
        })
        let i = 0 
        if(!user_data)throw new Error()
        else{
            user_data.tokens.filter((singletoken)=>{

                if (singletoken.token == token){
                    user_data.tokens.splice(i, 1)
                    user_data.save()
                    res.send({ data : user_data}) 
                }
                i++
            }) 
        }
     
    }
    catch(e){
        res.status(200).send({
            status:0,
            msg:"need auth",
            data: ""
        })
    }

})

// find all user
router.get('/Users',auth, async(req,res)=>{

    try{
        const user_data = await User.find()
        res.status(200).send({
            status:1,
            data: user_data,
            msg: `all users selected`
        })
    }
    catch(e){
        res.status(200).send({
            status:0,
            data: e,
            msg: `error loading data`
        })
    }
})

// delete my account
router.post('/deleteOne',auth, async (req, res)=>{
    try{
        await User.deleteOne({_id : req.data._id})
        User.save()
        res.status(200).send({ 
            statue : 1,
            msg: "User Deleted",
            error: ''
        }) 
    }catch(e){
        res.status(200).send({ 
            statue : 0,
            msg: "User Not Found",
            error: e
        }) 
    }
    
})


// Upload img 
let name = ''
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'images/users_profile')
    },
    filename: function(req,file,cb){
        name= file.originalname
        cb(null, file.originalname)
    }
    
})

const upload = multer({storage: storage})

router.post('/user/UploadProfileImg',auth, upload.single('upload'), async (req, res)=>{
    try{
        req.data.user_profile_img = `images/users_profile/${name}`
        await req.data.save()
        res.send({
            msg :"uploded"
        })
    }catch(e){console.log(e)}
    
})



module.exports = router