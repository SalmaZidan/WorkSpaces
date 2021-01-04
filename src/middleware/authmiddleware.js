const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next)=>{
    try{
        const token = req.header('Authorization').replace("Bearer ","")
        const decodedToken = jwt.verify(token, 'tsrnmb') 
        const data = await User.findOne({
            _id : decodedToken._id, 'tokens.token' : token
        })
        if(!data) throw new Error()
        req.token = token
        req.data = data
        next()
    }
    catch(e){
        res.status(200).send({
            status:0, 
            msg: "need auth",
            data: ""
        })
    }
}
module.exports = auth