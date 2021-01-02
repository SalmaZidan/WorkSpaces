const express = require('express')
const WorkingSpace = require('../models/workingspace')
const router = new express.Router()
// add WorkingSpaces
router.post('/addWorkingSpace',async (req,res)=>{
    const workingSpace = new WorkingSpace(req.body)
        try{
            await workingSpace.save()
            res.status(200).send({
                status:1,
                data: workingSpace,
                msg: 'workingSpace inserted',
            })
        }
        catch(e){
            res.status(500).send({
                status:0,
                data:e,
                msg:'error inserting data',
            })
        }
})

// show all workingSpace
router.get('/allWorkingSpaces',async (req,res)=>{
    try{
        const workingSpaces = await WorkingSpace.find({})
        res.status(200).send({
            status:1,
            data: workingSpaces,
            msg: 'all workingSpaces selected',
            me: req.data
        })
    }
    catch(e){
        res.status(500).send({
            status:0,
            data: e,
            msg: 'error loading workingSpaces data'
        })
    }
})

// show workingSpace employees
router.get('/WorkingSpaceEmployees/:id',async (req,res)=>{
    const _id= req.params.id
    x = WorkingSpace.findById(_id)
    try{
        await x.populate({
            path:'employees',
        }).execPopulate()
        
        res.send(x.employees)
    }
    catch(e){
        res.send(e)
    }
})



//edit workingSpace
router.patch('/workingSpace/:id', async(req,res)=>{
    const _id= req.params.id
    const updates = req.body
    const updatesKeys = Object.keys(req.body)
    const allowedUpdates = ["workingSpaceName","address","startTime","endTime","fullDesc","services"]
    const validUpdates = updatesKeys.every((u)=>allowedUpdates.includes(u))
    if(!validUpdates)
        res.status(400).send({
            status:4,
            data:'',
            msg:'invalid updates'
        })
    try{
        const workingSpace = await WorkingSpace.findByIdAndUpdate(_id, updates,{
            new:true,
            runValidators:true
        })
        if(!workingSpace){
            res.status(200).send({
                status:2,
                data:"",
                msg:"workingSpace not found"
            })
        }
        res.status(200).send({
            status:1,
            data: workingSpace,
            msg:"workingSpace data retreived successfuly"
        })
    }
    catch(e){
        res.status(500).send({
            statue: 0,
            data:'',
            msg:"error edit data"
        })
    }
})
//delete workingSpace
router.delete('/workingSpace/:id', async(req,res)=>{
    const _id= req.params.id
    try{
        const workingSpace = await WorkingSpace.findByIdAndDelete(_id)
        if(!workingSpace){
            res.status(200).send({
                status:2,
                data:"",
                msg:"workingSpace not found"
            })
        }
        res.status(200).send({
            status:1,
            data: workingSpace,
            msg:"workingSpace data deleted successfully"
        })
    }
    catch(e){
        res.status(500).send({
            statue: 0,
            data:'',
            msg:"error delete data"
        })
    }
})
//get single workingSpace
router.get('/workingSpace/:id', async(req,res)=>{
    const _id = req.params.id
    try{
        const workingSpace = await WorkingSpace.findById(_id)
        if(!workingSpace){
            res.status(200).send({
                status:2,
                data:"",
                msg:"workingSpace not found"
            })
        }
        res.status(200).send({
            status:1,
            data: workingSpace,
            msg:"workingSpace data retreived successfuly"
        })
    }
    catch(e){
        res.status(500).send({
            status:0,
            data: e,
            msg:'error loading user data'
        })
    }
})
//add service
router.post('/workingSpace/addService/:id', async(req,res)=>{
    const _id = req.params.id
    const data = req.body
       try{
        const workingSpace = await WorkingSpace.findById(_id)
        if(!workingSpace){
            throw new Error (' WorkingSpace not found')
        }
     workingSpace.services.push(data);
    await workingSpace.save();
       //console.log(workingSpace.services)
        res.status(200).send({
            status:1,
            data: workingSpace,
            msg:"workingSpace service Added successfully"
        })
    }
    catch(e){
        res.status(500).send({
            status:0,
            data: e,
            msg:'error adding service'
        })
    }
})


module.exports = router