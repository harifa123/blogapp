const express=require("express")
const blogmodel=require("../model/blogmodel")
const route=express.Router()
const bcrypt=require("bcryptjs")
hashpasswordgenerator=async(pass)=>{
    const salt=await bcrypt.genSalt(10)
    return bcrypt.hash(pass,salt)
}

route.post("/signin",async(req,res)=>{
    let {data}={"data":req.body}
    let password=data.password
    hashpasswordgenerator(password).then(
        (hashedpassword)=>{
            console.log(hashedpassword)
            data.password=hashedpassword
            console.log(data)
            let blog=new blogmodel(data)
            let result=blog.save()

            res.json({status:"success"})
        }
    )
    

})

module.exports=route