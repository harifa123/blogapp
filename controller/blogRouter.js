const express=require("express")
const blogmodel=require("../model/blogmodel")
const route=express.Router()

route.post("/signin",async(req,res)=>{
    let data=req.body
    let blog=new blogmodel(data)
    let result=blog.save()

    res.json({status:"success"})

})

module.exports=route