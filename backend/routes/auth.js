const express=require("express")
const router= express.Router()
const bcrypt = require('bcrypt');
const user= require("../models/user")

router.post('/login',async (req,res)=>{
    const email= req.body.email
    const password= req.body.password

    try{
        const foundUser=await user.findOne({email})
        if(!foundUser){
        res.status(400).json({msg:"Invalid email and password"}) 
        }else{
        let isCorrect = await bcrypt.compare(password,foundUser.password)
        if(!isCorrect){
            res.status(400).json({msg:"Invalid email and password"})
        }else{
            res.status(200).json({msg:"Login Successfully"})
        }
        }
    }catch(error){
        console.log(error);
        res.status(500).json({msg:"Internal Error"});
    }
})

router.post('/signup',async (req,res)=>{
    const {name,email,password} = req.body // destructuring done 
    try{
        const hash = await bcrypt.hash(password,10);
        const userr= new user({
        name:name,
        email:email,
        password:hash
        });
        await userr.save();
        res.json("you have succesfully destructured and stored the data ")
    }catch(error){
        console.log(error)
        res.status(500).json({error:"there is some error in the email"})
    }
})

module.exports= router;