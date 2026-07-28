const express=require("express");
const hotel=require("../models/hotel");
const router=express.Router();
const authMiddleware=require("../middleware/auth");

router.post("/",authMiddleware,async(req,res)=>{
    try{
        const {name,location,price,amenities,images,rating}=req.body;  //the code is destructured here 

        const listings= new hotel({
            name:name,
            location:location,
            price:price,
            amenities:amenities,
            images:images,
            rating:rating
        });

        await listings.save();
        res.status(201).json({message:"The data has been successfully destructured and stored",data:listings})
    }catch(error){
        res.status(400).json({message:"There is an internal server error! while storing the data"})
        console.log("error ",error)
    }
});

router.get("/",async(req,res)=>{
    try{
        const collection = await hotel.find({});
        res.status(200).json({message:"user can see the listings available in Db",list:collection});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Can not find the listing !"});
    }
})

module.exports=router;