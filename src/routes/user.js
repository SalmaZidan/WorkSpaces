const express= require('express')
const User = require('../models/user')
const mongodb = require('mongodb')
const jwt = require('jsonwebtoken');

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
            msg: 'all ${type} selected'
        })
    }
    catch(e){
        res.status(500).send({
            status:0,
            data: e,
            msg: 'error loading ${type} data'
        })
    }
})

router.get('/singleUser/:id', async(req,res)=>{
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

router.patch('/UserUpdate/:id', async(req,res)=>{
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

router.patch('/UpdatePassword/:id', async(req,res)=>{
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
            //  await user_data.updateOne(
            //     { 
            //         _id: user_data._id
            //     },
            //     {
            //         $pull : { 'tokens' : {  $elemMatch: { 'token' : token } } }
            //     },(error, success) => {
            //         if (error) console.log(error);
            //         console.log(success);
            //       });

              
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




module.exports = router