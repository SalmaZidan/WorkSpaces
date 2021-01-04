const mongoose = require('mongoose')
const User = require('./user')

const workingSpaceSchema = new mongoose.Schema({

    workingSpaceName: {
        type: String,
        required: true
    },
    address: {
        government:{
            type: String,
            //required: true
        }, //edit name 
        city:{
            type: String,
            //required: true
        },
        detailedAddress:{
            type: String,
            //required: true
        }
    },
    startTime: {
        type: String,
        //required: true
    },
    endTime: {
        type: String,
        //required: true
    },
    fullDesc: {
        type: String,
        //required: true
    },
    services: [
        {
            serviceName: {
                type: String,
                required: true
            },
            summary: {
                type: String,
                required: true
            },
            capacity: {
                type: Number,
                required: true
            },
            currentBookings: {
                type: Number,
                default: 0,
            },
            cost:{
                type: String,
                required:true
            },
            comments:[
                {
                    user_id:{type: mongoose.Schema.Types.ObjectId},
                    comment:{type:String}
                }
            ],
            service_img:{type:String}
        }
    ],
    Profile_img:{ type:String }
})

workingSpaceSchema.virtual('User',{
    ref:'User',
    localField: '_id',
    foreignField: 'workspace'
})


const workingSpace = mongoose.model('workingSpace', workingSpaceSchema);
module.exports = workingSpace