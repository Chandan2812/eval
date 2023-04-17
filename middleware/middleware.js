const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const { UserModel } = require("../model/user.model")
require("dotenv").config()
const {blacklist}=require("../blacklist")


const authmiddleware=async(req,res,next)=>{
    try {
        const token=req.headers.authorization
        const decoded=jwt.verify(token,process.env.token)

        if(blacklist.includes(token))
        {
            res.status(400).send({msg:"Unauthorized"})
        }
        const {userId}=decoded
        const user=await UserModel.findById(userId)
        if(!user)
        {
            res.status(400).send({msg:"Unauthorized"})
        }
        req.user=user
        next()


    } catch (error) {
        console.log(error)
    }
}

module.exports={authmiddleware}