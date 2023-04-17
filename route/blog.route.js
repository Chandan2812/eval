const express=require("express")
const {BlogModel}=require("../model/blog.model")
const blogRouter=express.Router()
const {authmiddleware}=require("../middleware/middleware")
const {checkrole}=require("../middleware/permission")

blogRouter.post("/add",async(req,res)=>{
    const data=req.body
    const blog=new BlogModel(data)
    await blog.save()
    res.send({msg:"Blogs added"})
})

blogRouter.get("/",authmiddleware,async(req,res)=>{
    
    const blogs=await BlogModel.find()
    res.send(blogs)
})

blogRouter.patch("update/:id",authmiddleware,async(req,res)=>{
    const userId=req.body.user
    const id=req.params.id
    const body=req.body
    const data=await BlogModel.findOne({_id:id})
    if(data.user==userId)
    {
        await BlogModel.findByIdAndUpdate({_id:id},body)
        res.send({msg:"Blogs Updated"})
    }
    else{
        res.send({msg:"Blogs not found"})
    }

})

blogRouter.delete("delete/:id",authmiddleware,async(req,res)=>{
    const userId=req.body.user
    const id=req.params.id
    const data=await BlogModel.findOne({_id:id})
    if(data.user==userId)
    {
        await BlogModel.findByIdAndDelete({_id:id})
        res.send({msg:"Blogs deleted"})
    }
    else{
        res.send({msg:"Blogs not found"})
    }

})

blogRouter.delete("/del/:id",authmiddleware,checkrole(["moderator"]),async(req,res)=>{
    const id=req.params.id
    await BlogModel.findByIdAndDelete({_id:id})
    res.send({msg:"Blogs deleted"})
})

module.exports={blogRouter}