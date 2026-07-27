const express=require("express");
const hotel=require("../models/hotel");
const router=express.Router();
const authMiddleware=require("../middleware/auth");

router.post("/",authMiddleware,(req,res)=>{
    res.json({message:"hotel routes works!"})
});

module.exports=router;