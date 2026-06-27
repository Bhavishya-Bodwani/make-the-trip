const express=require("express")
const router= express.Router()
const bcrypt = require('bcrypt');
const user= require("../models/user")

router.post('/login',(req,res)=>{
    console.log(req.body)
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