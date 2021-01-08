const express= require('express');
const Request = require('../models/requests');
const mongodb = require('mongodb');
const auth = require('../middleware/authmiddleware');
const router = new express.Router()

//add new request
router.post('/addRequests',auth, async (req, res)=>{
    const request_data = new Request({
        ...req.body,
        user_id: req.data._id
    })
    try{
        await request_data.save()
        res.status(200).send({
            status:1,
            data: request_data,
            msg: 'successful added',
            error:''
        })
    }
    catch(e){
        res.status(200).send({
            status:0,
            data: "no data",
            msg: 'failed added',
            error: e
        })
    }
})

//Get by workspace ID
router.get('/allRequests/:workspace_id',auth, async (req, res)=>{
    _id = req.params.workspace_id
    
    try{
        const requests = await Request.find({ "workspace_id" : _id})
        res.status(200).send({
            status:1,
            data: requests,
            msg: 'ok',
            error:''
        })
    }
    catch(e){
        res.status(200).send({
            status:0,
            data: '',
            msg: 'not ok',
            error:''
        })
    }

})

//Get by user ID
router.get('/allRequests',auth, async (req, res)=>{
    try{
        
        const requests = await Request.find({ "user_id" : req.data._id})
       
        res.status(200).send({
            status:1,
            data: requests,
            msg: 'ok',
            error:''
        })
    }
    catch(e){
        res.status(200).send({
            status:0,
            data: '',
            msg: 'not ok',
            error:''
        })
    }

})

//Delete Request 
router.post('/Delete/:requestId',auth, async (req, res)=>{
    _id = req.params.requestId
    try{
        request = await Request.findByIdAndDelete(_id)
        
        res.status(200).send({ 
            statue : 1,
            msg: "Request Deleted",
            error: ''
        }) 
    }catch(e){
        res.status(200).send({ 
            statue : 0,
            msg: " Not Found",
            error: e
        }) 
    }

})

//Edit Status

router.patch('/EditStatus/:id', async(req,res)=>{
    const _id= req.params.id
    const updates = req.body
    try{
        const req_data = await Request.findByIdAndUpdate(_id, updates,{
            new:true,
            runValidators:true
        })
        if(!req_data){
            res.status(200).send({
                status:2,
                data:"",
                msg:"user not found"
            })
        }
        res.status(200).send({
            status:1,
            data: req_data, 
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
module.exports = router