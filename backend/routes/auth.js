const express=require("express")
const router= express.Router()
const user= require("../models/user")

router.post('/login',(req,res)=>{
    console.log(req.body)
})

router.post('/signup',async (req,res)=>{
    const {name,email,password} = req.body // destructuring done 
    
    const userr= new user({
        name:name,
        email:email,
        password:password
    });
    await userr.save();
    res.json("you have succesfully destructured and stored the data ")
})

module.exports= router;