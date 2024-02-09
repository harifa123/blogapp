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
    //hashpasswordgenerator(password).then(
      //  (hashedpassword)=>{
        //    console.log(hashedpassword)
          //  data.password=hashedpassword
            //console.log(data)
            //let blog=new blogmodel(data)
            //let result=blog.save()

            //res.json({status:"success"})
       // }
    //)
    //simple method
    const hashedpassword=await hashpasswordgenerator(password)
    data.password=hashedpassword
    let blog=new blogmodel(data)
    let result=blog.save()
    res.json({status:"success"})
})

route.post("/signup",async(req,res)=>{
    let input=req.body
    let email=req.body.email
    let data=await blogmodel.findOne({"email":email})
    if(!data)
    {
        return res.json({status:"incorrect email id"})
    }
    console.log(data)
    let dbPassword=data.password
    let inputPassword=req.body.password
    console.log(dbPassword)
    console.log(inputPassword)

    const match=await bcrypt.compare(inputPassword,dbPassword)
    if(!match)
    {
        return res.json({status:"incorrect password"})
    }
    
    res.json({status:"success"})
    
})

module.exports=route