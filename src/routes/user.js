const express= require('express')
const User = require('../models/user')
const mongodb = require('mongodb')
const jwt = require('jsonwebtoken');
const auth = require('../middleware/authmiddleware')

const router = new express.Router()

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
        res.status(500).send({
            status:0,
            data: '',
            msg: 'failed registration',
            error : e,
            Token : ''
        })
    }

})

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
        res.status(500).send({
            status:0,
            data: e,
            msg: `error loading ${type} data`
        })
    }
})

router.get('/singleUser/:id',auth, async(req,res)=>{
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
        res.status(500).send({
            status:0,
            data: e,
            msg: 'error loading user data'
        })
    }
})

router.patch('/UserUpdate/:id',auth, async(req,res)=>{
    const _id= req.params.id
    const updates = req.body
    const updatesKeys = Object.keys(req.body)
    const allowedUpdates = ["user_name","user_email","user_image","user_phoneNumber","user_address"]
    const validUpdates = updatesKeys.every((u)=>allowedUpdates.includes(u))
    if(!validUpdates)
        res.status(400).send({
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
        res.status(500).send({
            statue: 0,
            data:'',
            msg:"error edit data",
            error: e
        })
    }
})

router.patch('/UpdatePassword/:id',auth, async(req,res)=>{
    const _id= req.params.id
    const updates = req.body
    const updatesKeys = Object.keys(req.body)
    const allowedUpdates = ["user_password"]
    const validUpdates = updatesKeys.every((u)=>allowedUpdates.includes(u))
    if(!validUpdates)
        res.status(400).send({
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
        res.status(500).send({
            statue: 0,
            data:'',
            msg:"error edit data",
            error: e
        })
    }
})

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
        res.status(500).send({
            status:0,
            data: e,
            msg: "login error",
            token:''
        })
    }

})

router.patch('/logout', async (req, res)=>{
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
        res.status(500).send({
            status:0,
            msg:"need auth",
            data: ""
        })
    }

})

router.get('/Users',auth, async(req,res)=>{
    type = req.params.type
    try{
        const user_data = await User.find()
        res.status(200).send({
            status:1,
            data: user_data,
            msg: `all users selected`
        })
    }
    catch(e){
        res.status(500).send({
            status:0,
            data: e,
            msg: `error loading data`
        })
    }
})

router.post('/user/addComment/:ServiceId',auth, async (req, res)=>{
    const _id= req.params.ServiceId
    
    let user_data = await User.findById(req.data._id) // from auth

    const Comment = {
        service_id:_id,
        comment: req.body.comment
    }

    if(!user_data){
        res.status(400).send({
            statue: 0,
            data:'',
            msg:"user not exists",
            error:''
        })
    }
    try{
        user_data.user_comments.push(Comment)
        user_data.save()

        res.status(200).send({
            statue: 1,
            data:user_data,
            msg:"comment added",
            error:''
        })
    }catch(e){
        res.status(500).send({
            statue: 0,
            data:'',
            msg:"Addition failed",
            error:e
        })
    }
    


    



})

router.post('/deleteComment/:CommentId',auth, async (req, res)=>{
    const comment_id= req.params.CommentId
    let user_data = await User.findById(req.data._id)
    
    try{
        let i = 0 
        if(!user_data)throw new Error()
        else{
            user_data.user_comments.filter((singleComment)=>{

                if (singleComment._id == comment_id){
                    user_data.user_comments.splice(i, 1)
                    user_data.save()
                    res.status(200).send({ 
                        statue : 1,
                        msg: "Comment Deleted",
                        data : user_data,
                        error: ''

                    }) 
                }
                i++
            }) 
        }
     
    }
    catch(e){
        res.status(500).send({
            status:0,
            msg:"can't find this comment",
            data: "",
            error: e
        })
    }

})




module.exports = router