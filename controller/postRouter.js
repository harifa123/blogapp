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

route.get("/viewall",async(req,res)=>{
    let data=await postmodel.find()
    .populate("userid","name age mobile address pin email -_id ")
    .exec()
    res.json(data)
})

module.exports=route