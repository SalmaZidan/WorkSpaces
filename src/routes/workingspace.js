const express = require('express')
const auth = require('../middleware/authmiddleware')
const WorkingSpace = require('../models/workingspace')
const router = new express.Router();
const multer = require('multer');

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
router.get('/workingSpace/:id',auth, async(req,res)=>{
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

//delete service
router.post("/deleteService/:ServiceId",auth, async (req, res) => {
    const serviceId = req.params.ServiceId;
    const workingSpaces = await WorkingSpace.findById(req.data.workspace)
    try { 
      let i = 0;
      workingSpaces.services.filter((singleService) => {
          if (singleService._id == serviceId) {
            workingSpaces.services.splice(i, 1);
            workingSpaces.save();
            res.status(200).send({
              statue: 1,
              data: workingSpaces,
              msg: "service Deleted successfully"  
            });
          }
          i++;
        });
    } 
    catch (e) {
      res.status(500).send({ 
        status: 0, 
          data: e ,
          msg: "can't delete this service"
  
        });
    }
})
  
//edit Service
router.patch("/editService/:serviceId",auth, async (req, res) => {
    const workingSpace_data = await WorkingSpace.findById(req.data.workspace)
    const serviceId = req.params.serviceId;
    const updates = req.body;
    const updatesKeys = Object.keys(req.body);
    const allowedUpdates = [
      "serviceName",
      "summary",
      "capacity",
      "currentBookings",
      "cost"
    ];
    const validUpdates = updatesKeys.every((u) => allowedUpdates.includes(u));
    if (!validUpdates)
      res.status(400).send({
        status: 4,
        data: "",
        msg: "invalid updates",
    });

    try {
      let i = 0;
      workingSpace_data.services.filter((singleService) => {
         
          if (singleService._id == serviceId) {
            console.log(singleService)
            workingSpace_data.services[i] = updates
            workingSpace_data.save();
            res.status(200).send({
              statue: 1,
              data: workingSpace_data,
              msg: "service updated successfully"  
            });
          }
          i++;
        });
              
    } catch (e) {
      res.status(500).send({
        statue: 0,
        data: e,
        msg: "error edit data",
    
  });
  }
})

//add comment
router.post('/workingSpace/addcomment/:workspace_id/:Service_id',auth, async(req,res)=>{
    const Service_id = req.params.Service_id
    const workspace_id = req.params.workspace_id

    data = {
        ...req.body,
        user_id: req.data._id
    }

    try{
        const workingSpace = await WorkingSpace.findById(workspace_id)

        if(!workingSpace){
            res.statue(200).send({
                status: 0 ,
                data: '',
                msg: "check workspace again",
                error :'workspace not found'
            })
        }
        
        let i = 0 
        workingSpace.services.filter((singleService=>{
            
            if (singleService._id == Service_id ){
                workingSpace.services[i].comments.push(data);
                console.log(workingSpace.services[i].comments)
                workingSpace.save()
                res.status(200).send({
                    status: 1,
                    data: workingSpace,
                    msg: "comment added",
                    error : ''
                })
            }
            i++
        }))
    }
    catch(e){
        res.status(200).send({
            status: 0,
            data: 'workingSpaces',
            msg: "comment faield added",
            error : e
        })
    }
})

//Delete comment
router.post('/workingSpace/deletecomment/:workspace_id/:Service_id/:comment_id',auth, async(req,res)=>{
    const Service_id = req.params.Service_id
    const workspace_id = req.params.workspace_id
    const comment_id = req.params.comment_id
    let i = 0 
    let j = 0

    try{
        const workingSpace = await WorkingSpace.findById(workspace_id)

        if(!workingSpace){
            res.statue(200).send({
                status: 0 ,
                data: '',
                msg: "check workspace again",
                error :'workspace not found'
            })
        }
        
        workingSpace.services.filter((singleService=>{
            
            if (singleService._id == Service_id ){

                workingSpace.services[i].comments.filter((singleComment=>{

                    if (singleComment._id == comment_id){
                        workingSpace.services[i].comments.splice(j,1)
                        workingSpace.save()
                        res.status(200).send({
                            status: 1,
                            data: workingSpace,
                            msg: "comment deleted",
                            error : ''
                        })
                    }
                    j++
                    
                }))
                

            }
            i++
        }))
    }
    catch(e){
        res.status(200).send({
            status: 0,
            data: 'workingSpaces',
            msg: "comment faield deleted",
            error : e
        })
    }
})

// Upload img 
let name = ''
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'workSpace-App/src/assets/images/workspace')
    },
    filename: function(req,file,cb){
        name= file.originalname
        cb(null, file.originalname)
    }
    
})

const upload = multer({storage: storage})

router.post('/workspace/UploadProfileImg/:workspace_id', upload.single('upload'), async (req, res)=>{
    const workspace_id = req.params.workspace_id
    try{
        const workingSpace = await WorkingSpace.findById(workspace_id)
        workingSpace.Profile_img = `assets/images/workspace/${name}`
        await workingSpace.save()
        res.send({
            msg :"uploded"
        })
    }catch(e){console.log(e)}
    
})





module.exports = router