const express=require("express")
const router= express.Router()

router.post('/login',(req,res)=>{
    console.log(req.body)
})

router.post('/signup',(req,res)=>{
    res.json("sign up from here")
})

module.exports= router;