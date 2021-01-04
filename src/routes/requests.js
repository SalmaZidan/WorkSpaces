const express= require('express');
const Request = require('../models/requests');
const mongodb = require('mongodb');
const auth = require('../middleware/authmiddleware');
const router = new express.Router()

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

module.exports = router