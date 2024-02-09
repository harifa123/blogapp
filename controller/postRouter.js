const express=require("express")
const postmodel=require("../model/postmodel")
const route=express.Router()

route.post("/add",async(req,res)=>
{
    let data=req.body
    let post=new postmodel(data)
    let result=post.save()

    res.json({status:"success"})
})

module.exports=route