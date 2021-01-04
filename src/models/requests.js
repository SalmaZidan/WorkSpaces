const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
    workspace_id:{
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    service_id:{
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        require : true
    },
    status:{
        type:String,
        enum: [ "pendding", "accepted", "rejected"],
        default: "pendding",
        required : true
    },
    action_by:{
        type: mongoose.Schema.Types.ObjectId,
    },
    date_created:{
        type:Date,
        default: Date.now()
    },
    reservation_date:{
        type:Date,
        require:true
    },
    guests_number:{
        type:Number
    }

})

const requests = mongoose.model('requests', RequestSchema);
module.exports = requests