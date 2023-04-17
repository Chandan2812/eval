const express=require("express")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const UserModel=require("../model/user.model")
const { blacklist } = require("../blacklist")
require("dotenv").config()


const userRoute=express.Router()

userRoute.post("/register",async(req,res)=>{
    try {
        const {name,email,password,role}=req.body
        const userExist=await UserModel.findOne({email})
        if(userExist)
        {
            return res.send({msg:"User already exist"})
        }
        const hashed=bcrypt.hashSync(password,5)
        const user=new UserModel({name,email,password:hashed,role})
        await user.save()
        res.send("Registration successful")
    } catch (error) {
        res.send("something went wrong")
    }
})



userRoute.post("/login",async(req,res)=>{
    try {
        const {email,password}=req.body
        const user=await UserModel.findOne({email})
        if(!user)
        {
            res.send({msg:"Invalid username"})
        }
        const pass=await bcrypt.compare(pass,user.password)
        if(!pass)
        {
            res.send({msg:"Wrong password"})
        }
        const token=jwt.sign({userId:user._id},process.env.token,{expiresIn:"1m"})
        const refreshToken=jwt.sign({userId:user._id},process.env.refreshToken,{expiresIn:"3m"})
        res.send({msg:"login successful"})
    } catch (error) {
        console.log(error)
    }
})



userRoute.get("/logout",async(req,res)=>{
    const token=req.headers.authorization
    blacklist.push(token)
    res.send({msg:"logout successful"})
})


userRoute.get("newToken",async(req,res)=>{
    const refreshToken=req.headers.authorization
    if(decoded)
    {

        const decoded=jwt.verify(refreshToken,process.env.refreshToken)
        const token=jwt.sign({userId:decoded.userId},process.env.refreshToken,{expiresIn:'1m'})
        res.send({token:token})
    }
    else{
        res.send({msg:"Invalid refresh token"})
    }
})


module.exports={userRoute}