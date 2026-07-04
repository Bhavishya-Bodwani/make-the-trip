const express=require("express")
const router= express.Router()
const bcrypt = require('bcrypt');
const jwt= require("jsonwebtoken");
const user= require("../models/user");
const auth= require("../middleware/auth");

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
            const token=jwt.sign({id:foundUser._id},process.env.JWT_SECRET,{expiresIn: 7*24*60*60})
            res.status(200).json({msg:"Login Successfully",token})
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
        res.status(200).json({msg:"you have succesfully destructured and stored the data "})
    }catch(error){
        console.log(error)
        if(error.name==="ValidationError"){
            res.status(400).json({error:"There is some issue please enter all the details correctly!"})
        }else{
            res.status(500).json({error:"Internal Server"})
        }
    }
})

router.get("/profile",auth,(req,res)=>{
    res.status(200).json({msg:"You are authenticated",userId:req.userId})
})

module.exports= router;